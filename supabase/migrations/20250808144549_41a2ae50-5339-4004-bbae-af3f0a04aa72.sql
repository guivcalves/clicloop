-- Create logs_auditoria table for auditing actions like terms acceptance
CREATE TABLE IF NOT EXISTS public.logs_auditoria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  acao TEXT NOT NULL,
  detalhes JSONB NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (service role bypasses RLS)
ALTER TABLE public.logs_auditoria ENABLE ROW LEVEL SECURITY;

-- Optional index for faster queries by creation time
CREATE INDEX IF NOT EXISTS idx_logs_auditoria_criado_em ON public.logs_auditoria (criado_em DESC);
