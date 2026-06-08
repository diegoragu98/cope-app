-- Sprint 2: Pending Items as Projection Layer
-- Allows users to track incoming/outgoing money without moving actual account balances
-- Soft delete pattern: is_resolved = true instead of hard delete

CREATE TABLE IF NOT EXISTS pending_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('incoming','outgoing')),
  concept VARCHAR(255) NOT NULL,
  amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(10) DEFAULT 'MXN' CHECK (currency IN ('MXN','USD')),
  expected_date DATE,
  is_resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_pending_items_user_id ON pending_items(user_id);
CREATE INDEX idx_pending_items_is_resolved ON pending_items(is_resolved);

-- Row Level Security
ALTER TABLE pending_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see only their own pending items"
  ON pending_items FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
