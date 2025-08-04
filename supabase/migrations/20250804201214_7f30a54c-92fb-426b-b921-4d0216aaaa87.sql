-- =============================================
-- CLIENTE JÁ - CONFIGURAÇÃO SUPABASE
-- =============================================

-- 1. TABELA PROFILES (auxiliar ao auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nome TEXT NOT NULL,
  nicho TEXT,
  como_ajuda TEXT,
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  plano_ativo BOOLEAN NOT NULL DEFAULT false,
  stripe_id TEXT
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- 2. TABELA SUGESTOES
CREATE TABLE public.sugestoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mensagem TEXT NOT NULL,
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sugestoes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for sugestoes
CREATE POLICY "Users can view their own suggestions" 
ON public.sugestoes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own suggestions" 
ON public.sugestoes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own suggestions" 
ON public.sugestoes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own suggestions" 
ON public.sugestoes 
FOR DELETE 
USING (auth.uid() = user_id);

-- 3. TABELA CHAT_MENSAGENS
CREATE TABLE public.chat_mensagens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('user', 'ia')),
  mensagem TEXT NOT NULL,
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sessao_id UUID
);

-- Enable RLS
ALTER TABLE public.chat_mensagens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chat_mensagens
CREATE POLICY "Users can view their own chat messages" 
ON public.chat_mensagens 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat messages" 
ON public.chat_mensagens 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat messages" 
ON public.chat_mensagens 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chat messages" 
ON public.chat_mensagens 
FOR DELETE 
USING (auth.uid() = user_id);

-- 4. TABELA PROMPTS_GERADOS
CREATE TABLE public.prompts_gerados (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nicho TEXT NOT NULL,
  objetivo TEXT NOT NULL,
  tipo_ia TEXT NOT NULL,
  briefing TEXT NOT NULL,
  prompt_gerado TEXT NOT NULL,
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prompts_gerados ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prompts_gerados
CREATE POLICY "Users can view their own prompts" 
ON public.prompts_gerados 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prompts" 
ON public.prompts_gerados 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prompts" 
ON public.prompts_gerados 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prompts" 
ON public.prompts_gerados 
FOR DELETE 
USING (auth.uid() = user_id);

-- 5. TABELA CAMPANHAS_ANALISADAS
CREATE TABLE public.campanhas_analisadas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  publico_alvo TEXT NOT NULL,
  objetivo TEXT NOT NULL,
  titulo_anuncio TEXT NOT NULL,
  texto_anuncio TEXT NOT NULL,
  link_destino TEXT NOT NULL,
  investimento_total NUMERIC NOT NULL,
  alcance INTEGER NOT NULL,
  cliques INTEGER NOT NULL,
  ctr NUMERIC NOT NULL,
  cpm NUMERIC NOT NULL,
  frequencia NUMERIC NOT NULL,
  taxa_conversao NUMERIC NOT NULL,
  custo_conversao NUMERIC NOT NULL,
  roas NUMERIC,
  canais TEXT[] NOT NULL,
  duracao_dias INTEGER NOT NULL,
  observacoes TEXT,
  analise_ia TEXT,
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.campanhas_analisadas ENABLE ROW LEVEL SECURITY;

-- RLS Policies for campanhas_analisadas
CREATE POLICY "Users can view their own campaigns" 
ON public.campanhas_analisadas 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own campaigns" 
ON public.campanhas_analisadas 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns" 
ON public.campanhas_analisadas 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own campaigns" 
ON public.campanhas_analisadas 
FOR DELETE 
USING (auth.uid() = user_id);

-- 6. TABELA CONTEUDOS_GERADOS
CREATE TABLE public.conteudos_gerados (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  formato TEXT NOT NULL CHECK (formato IN ('Carrossel', 'Reels', 'Estático')),
  tema TEXT NOT NULL,
  estrutura TEXT NOT NULL,
  legenda TEXT NOT NULL,
  hashtags TEXT NOT NULL,
  horario_postagem TEXT NOT NULL,
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.conteudos_gerados ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conteudos_gerados
CREATE POLICY "Users can view their own content" 
ON public.conteudos_gerados 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own content" 
ON public.conteudos_gerados 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own content" 
ON public.conteudos_gerados 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content" 
ON public.conteudos_gerados 
FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================
-- TRIGGERS E FUNÇÕES
-- =============================================

-- Função para criar profile automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, criado_em, plano_ativo)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'nome', NEW.email),
    now(),
    false
  );
  RETURN NEW;
END;
$$;

-- Trigger para executar a função quando um usuário é criado
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Função para atualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- ÍNDICES PARA PERFORMANCE
-- =============================================

-- Índices para otimizar consultas por user_id
CREATE INDEX idx_sugestoes_user_id ON public.sugestoes(user_id);
CREATE INDEX idx_chat_mensagens_user_id ON public.chat_mensagens(user_id);
CREATE INDEX idx_chat_mensagens_sessao_id ON public.chat_mensagens(sessao_id);
CREATE INDEX idx_prompts_gerados_user_id ON public.prompts_gerados(user_id);
CREATE INDEX idx_campanhas_analisadas_user_id ON public.campanhas_analisadas(user_id);
CREATE INDEX idx_conteudos_gerados_user_id ON public.conteudos_gerados(user_id);

-- Índices para timestamps (ordenação)
CREATE INDEX idx_sugestoes_criado_em ON public.sugestoes(criado_em DESC);
CREATE INDEX idx_chat_mensagens_criado_em ON public.chat_mensagens(criado_em DESC);
CREATE INDEX idx_prompts_gerados_criado_em ON public.prompts_gerados(criado_em DESC);
CREATE INDEX idx_campanhas_analisadas_criado_em ON public.campanhas_analisadas(criado_em DESC);
CREATE INDEX idx_conteudos_gerados_criado_em ON public.conteudos_gerados(criado_em DESC);