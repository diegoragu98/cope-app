-- =====================================================
-- MIGRACIÓN 005: Metas y Proyectos
-- =====================================================
-- Reusa la tabla `goals` existente (Sprint 1, nunca se construyó feature encima).
-- Discrimina metas vs proyectos con la columna `type`.
--   - meta:     tiene target_amount, barra de progreso (ahorrado / target).
--   - proyecto: SIN target, solo acumula registros de gasto.
-- Agrega `goal_contributions`: aportaciones de meta / registros de gasto de proyecto.
-- IMPORTANTE: source_account_id es solo INFORMATIVO. NO mueve saldos de cuentas.
--             Metas/Proyectos NO afecta el Patrimonio Total (sería doble conteo).
--
-- Decisiones aprobadas (NO duplicar columnas):
--   - Reusar `title` existente (no agregar `name`).
--   - Reusar `status='active'` existente (no agregar `is_active`).
--   - Quitar NOT NULL de `target_amount` (proyectos no tienen target).
--   - Agregar `type` NOT NULL limpia, SIN default (la tabla está vacía en prod).
-- =====================================================

-- Ajuste a goals existente
ALTER TABLE goals ALTER COLUMN target_amount DROP NOT NULL;
ALTER TABLE goals ADD COLUMN type VARCHAR(10) NOT NULL CHECK (type IN ('meta','proyecto'));

-- Tabla nueva de aportaciones/registros (sirve para meta y proyecto)
CREATE TABLE IF NOT EXISTS goal_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
  source_account_id UUID REFERENCES accounts(id) ON DELETE SET NULL, -- informativo, NO mueve saldos
  amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
  contribution_date DATE NOT NULL DEFAULT CURRENT_DATE,
  concept TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_goal_contributions_user_id ON goal_contributions(user_id);
CREATE INDEX idx_goal_contributions_goal_id ON goal_contributions(goal_id);

ALTER TABLE goal_contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see only their own goal contributions"
  ON goal_contributions FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
