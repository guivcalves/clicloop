-- Criar tabela de logs de auditoria para conformidade LGPD
CREATE TABLE public.logs_auditoria (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  acao TEXT NOT NULL,
  detalhes TEXT,
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.logs_auditoria ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS
CREATE POLICY "Users can view their own audit logs" 
ON public.logs_auditoria 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own audit logs" 
ON public.logs_auditoria 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Criar índice para performance
CREATE INDEX idx_logs_auditoria_user_id ON public.logs_auditoria(user_id);
CREATE INDEX idx_logs_auditoria_criado_em ON public.logs_auditoria(criado_em);