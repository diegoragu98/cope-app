/**
 * ESQUEMA DE BASE DE DATOS PARA COPE — ESTUDIO DESKTOP
 *
 * ¿Qué es esto?
 * Aquí definimos las 3 tablas principales donde van a vivir tus datos en la nube:
 * - Cuentas: tus bancos e inversiones
 * - Movimientos: entradas y salidas de dinero
 * - Metas: lo que quieres lograr financieramente
 *
 * IMPORTANTE: Este SQL es solo una PROPUESTA. No se ha ejecutado en Supabase.
 * Diego lo revisa en la próxima sesión antes de crear las tablas reales.
 */

-- =====================================================
-- TABLA 1: ACCOUNTS (Cuentas bancarias e inversiones)
-- =====================================================
-- ¿Qué hace?
-- Aquí guardamos cada banco, tarjeta, o instrumento de inversión que tienes.
-- Cada cuenta está vinculada a ti (user_id) para que solo veas la tuya.

CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Información básica
  name VARCHAR(255) NOT NULL, -- ej: "Mi cuenta del Banorte", "Mi fondo de inversión"
  type VARCHAR(50) NOT NULL, -- ej: "checking", "savings", "investment", "credit_card"
  institution VARCHAR(255), -- ej: "Banorte", "GBM", "Fondo de Inversión XYZ"
  account_number VARCHAR(100), -- número de cuenta (encriptado en versión final)

  -- Datos financieros
  balance DECIMAL(15, 2) DEFAULT 0, -- saldo actual (se actualiza con movimientos)
  currency VARCHAR(10) DEFAULT 'MXN', -- moneda de la cuenta

  -- Metadata
  color VARCHAR(20), -- color para UI (ej: "#FF5733")
  icon VARCHAR(50), -- emoji o ícono (ej: "🏦")
  is_active BOOLEAN DEFAULT TRUE, -- ¿está esta cuenta vigente?

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Índices para búsquedas rápidas
  CONSTRAINT accounts_user_unique UNIQUE(user_id, name)
);
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_accounts_type ON accounts(type);

-- RLS: Row Level Security — Solo el propietario puede ver/editar sus cuentas
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own accounts"
  ON accounts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- TABLA 2: MOVEMENTS (Movimientos de dinero)
-- =====================================================
-- ¿Qué hace?
-- Aquí vive cada transacción: dinero que entra o sale.
-- Cada movimiento está vinculado a una cuenta y opcionalmente a una meta.

CREATE TABLE IF NOT EXISTS movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  goal_id UUID REFERENCES goals(id) ON DELETE SET NULL, -- opcional: ¿para qué meta es este dinero?

  -- Información básica
  description VARCHAR(500) NOT NULL, -- ej: "Depósito de sueldo", "Compra en Amazon"
  category VARCHAR(100), -- ej: "salary", "food", "transport", "investment", "savings"
  amount DECIMAL(15, 2) NOT NULL, -- cantidad de dinero
  type VARCHAR(20) NOT NULL, -- "income" (dinero entra) o "expense" (dinero sale)

  -- Contexto
  date DATE NOT NULL, -- cuándo pasó esto
  notes TEXT, -- notas adicionales si necesitas

  -- Metadata
  is_recurring BOOLEAN DEFAULT FALSE, -- ¿es una transacción que se repite?
  recurring_frequency VARCHAR(50), -- ej: "monthly", "weekly" (si es recurrente)

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_movements_user_id ON movements(user_id);
CREATE INDEX idx_movements_account_id ON movements(account_id);
CREATE INDEX idx_movements_goal_id ON movements(goal_id);
CREATE INDEX idx_movements_date ON movements(date);
CREATE INDEX idx_movements_category ON movements(category);

-- RLS: Solo el propietario puede ver/editar sus movimientos
ALTER TABLE movements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own movements"
  ON movements FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- TABLA 3: GOALS (Metas financieras)
-- =====================================================
-- ¿Qué hace?
-- Aquí guardas qué quieres lograr: "ahorrar para una casa", "viaje", "fondo de emergencia".
-- Cada meta tiene un target (cuánto quieres) y puedes ir viendo el progreso.

CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Información básica
  title VARCHAR(255) NOT NULL, -- ej: "Fondo de emergencia", "Viaje a Europa"
  description TEXT, -- descripción más larga si quieres
  category VARCHAR(100), -- ej: "emergency_fund", "travel", "home", "education"

  -- Números importantes
  target_amount DECIMAL(15, 2) NOT NULL, -- cuánto quieres ahorrar (ej: $50,000)
  current_amount DECIMAL(15, 2) DEFAULT 0, -- cuánto llevas ahorrado
  currency VARCHAR(10) DEFAULT 'MXN',

  -- Línea de tiempo
  target_date DATE, -- para cuándo quieres lograrlo
  priority VARCHAR(20), -- "high", "medium", "low"

  -- Estado
  status VARCHAR(20) DEFAULT 'active', -- "active", "paused", "completed"

  -- Metadata
  color VARCHAR(20), -- color para UI
  icon VARCHAR(50), -- emoji (ej: "🏠")

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_status ON goals(status);
CREATE INDEX idx_goals_target_date ON goals(target_date);

-- RLS: Solo el propietario puede ver/editar sus metas
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own goals"
  ON goals FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- NOTAS SOBRE ESTE ESQUEMA
-- =====================================================
/*
RELACIONES:
- Un usuario puede tener muchas cuentas (Accounts)
- Cada cuenta puede tener muchos movimientos (Movements)
- Cada movimiento OPCIONALMENTE está vinculado a una meta (Goals)
- Un usuario puede tener muchas metas

RLS (Row Level Security):
- Cada tabla tiene políticas que garantizan que solo veas TUS datos
- Si alguien intenta hackear, no puede ver datos de otro usuario
- Supabase verifica automáticamente: "¿Eres el dueño de esto?" antes de darte acceso

BALANCE EN ACCOUNTS:
- El balance se actualiza cuando hay nuevos movimientos
- Posibilidad: hacer trigger automático que actualice balance cuando hay un movimiento nuevo

ÍNDICES:
- Hacen que las búsquedas sean RÁPIDAS
- Ejemplo: si buscas todos tus movimientos de una fecha, el índice en `date` hace que sea instantáneo

PRÓXIMA SESIÓN:
- Revisar este SQL
- Crear las tablas en Supabase
- Añadir autenticación (login/signup)
- Crear primera pantalla de Cuentas
*/
