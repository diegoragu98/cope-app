-- Tabla que reemplaza el Google Form: aportaciones y retiros de inversión
CREATE TABLE IF NOT EXISTS investment_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  amount DECIMAL(15,2) NOT NULL CHECK (amount > 0), -- siempre positivo
  type VARCHAR(10) NOT NULL CHECK (type IN ('ingreso','retiro')),
  movement_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_investment_movements_user_id ON investment_movements(user_id);
CREATE INDEX idx_investment_movements_account_id ON investment_movements(account_id);

ALTER TABLE investment_movements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see only their own investment movements"
  ON investment_movements FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
