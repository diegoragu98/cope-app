-- ============================================
-- MIGRACIÓN 2: Separar Tarjetas de Crédito
-- ============================================
--
-- Esta migración:
-- 1. Quita los campos de TDC de la tabla 'accounts'
-- 2. Crea tabla 'credit_cards' para gestionar TDC separadamente
-- 3. Crea tabla 'credit_card_payments' para historial de pagos
-- 4. Configura RLS (seguridad) en ambas tablas nuevas

-- ============================================
-- PASO 1: Modificar tabla 'accounts'
-- ============================================
-- Remover columnas que eran para tarjetas de crédito

ALTER TABLE accounts
DROP COLUMN IF EXISTS credit_limit,
DROP COLUMN IF EXISTS credit_used,
DROP COLUMN IF EXISTS cutoff_day,
DROP COLUMN IF EXISTS payment_day;

-- Actualizar el CHECK constraint de 'type'
-- (remover 'credit_card' de las opciones válidas)
ALTER TABLE accounts
DROP CONSTRAINT IF EXISTS accounts_type_check,
ADD CONSTRAINT accounts_type_check CHECK (
  type IN ('checking', 'savings', 'investment_rv', 'investment_rf', 'digital_wallet', 'cash', 'other')
);

-- ============================================
-- PASO 2: Crear tabla 'credit_cards'
-- ============================================
-- Almacena tus tarjetas de crédito con sus datos básicos

CREATE TABLE IF NOT EXISTS credit_cards (
  -- ID único (el sistema crea uno automáticamente)
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- De quién es esta tarjeta (vinculada a tu usuario)
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Información básica de la tarjeta
  name VARCHAR(255) NOT NULL,                    -- Ej: "AMEX", "Santander Like U"
  institution VARCHAR(255),                      -- Ej: "American Express", "Santander"
  currency VARCHAR(10) DEFAULT 'MXN' CHECK (currency IN ('MXN', 'USD')),

  -- El saldo ACTUAL que debes en esta tarjeta
  current_balance DECIMAL(15,2) DEFAULT 0,

  -- Fechas importantes
  cutoff_day INTEGER CHECK (cutoff_day BETWEEN 1 AND 31),     -- Día en que corta
  payment_day INTEGER CHECK (payment_day BETWEEN 1 AND 31),   -- Día en que vence

  -- Personalización visual
  color VARCHAR(7),                               -- Ej: "#FF5733" (color hex)
  icon VARCHAR(50),                               -- Ej: "amex", "visa", "mastercard"
  is_active BOOLEAN DEFAULT true,

  -- Auditoría (cuándo se creó y se modificó)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Restricción: no puedes tener dos tarjetas con el mismo nombre
  UNIQUE(user_id, name)
);

-- Índice para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_credit_cards_user_id ON credit_cards(user_id);

-- ============================================
-- PASO 3: Crear tabla 'credit_card_payments'
-- ============================================
-- Historial de cada pago que haces a tus tarjetas

CREATE TABLE IF NOT EXISTS credit_card_payments (
  -- ID único
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- De quién es este pago
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Qué tarjeta se pagó
  credit_card_id UUID NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,

  -- DE CUÁL CUENTA sacaste el dinero para pagar (opcional)
  -- Ej: pagaste AMEX desde Santander
  source_account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,

  -- El dinero que pagaste
  amount DECIMAL(15,2) NOT NULL,

  -- Cuándo hiciste el pago
  payment_date DATE NOT NULL,

  -- Notas opcionales (para tu referencia)
  notes TEXT,

  -- Cuándo se registró este pago
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT valid_amount CHECK (amount > 0)
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_credit_card_payments_user_id ON credit_card_payments(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_card_payments_credit_card_id ON credit_card_payments(credit_card_id);
CREATE INDEX IF NOT EXISTS idx_credit_card_payments_payment_date ON credit_card_payments(payment_date);

-- ============================================
-- PASO 4: Activar RLS (Row Level Security)
-- ============================================
-- Esto significa: cada usuario solo ve sus propios datos

-- Activar RLS en credit_cards
ALTER TABLE credit_cards ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas anteriores si existen (para evitar conflictos)
DROP POLICY IF EXISTS "Users can view their own credit cards" ON credit_cards;
DROP POLICY IF EXISTS "Users can insert their own credit cards" ON credit_cards;
DROP POLICY IF EXISTS "Users can update their own credit cards" ON credit_cards;
DROP POLICY IF EXISTS "Users can delete their own credit cards" ON credit_cards;

-- Política 1: Los usuarios pueden ver SOLO sus propias tarjetas
CREATE POLICY "Users can view their own credit cards"
  ON credit_cards
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política 2: Los usuarios pueden insertar (crear) sus propias tarjetas
CREATE POLICY "Users can insert their own credit cards"
  ON credit_cards
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política 3: Los usuarios pueden actualizar (editar) sus propias tarjetas
CREATE POLICY "Users can update their own credit cards"
  ON credit_cards
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Política 4: Los usuarios pueden eliminar (borrar) sus propias tarjetas
CREATE POLICY "Users can delete their own credit cards"
  ON credit_cards
  FOR DELETE
  USING (auth.uid() = user_id);

-- Activar RLS en credit_card_payments
ALTER TABLE credit_card_payments ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas anteriores si existen (para evitar conflictos)
DROP POLICY IF EXISTS "Users can view their own credit card payments" ON credit_card_payments;
DROP POLICY IF EXISTS "Users can insert their own credit card payments" ON credit_card_payments;
DROP POLICY IF EXISTS "Users can update their own credit card payments" ON credit_card_payments;
DROP POLICY IF EXISTS "Users can delete their own credit card payments" ON credit_card_payments;

-- Política 1: Los usuarios pueden ver SOLO sus propios pagos
CREATE POLICY "Users can view their own credit card payments"
  ON credit_card_payments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política 2: Los usuarios pueden insertar (crear) sus propios pagos
CREATE POLICY "Users can insert their own credit card payments"
  ON credit_card_payments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política 3: Los usuarios pueden actualizar (editar) sus propios pagos
CREATE POLICY "Users can update their own credit card payments"
  ON credit_card_payments
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Política 4: Los usuarios pueden eliminar (borrar) sus propios pagos
CREATE POLICY "Users can delete their own credit card payments"
  ON credit_card_payments
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- FIN DE LA MIGRACIÓN
-- ============================================
