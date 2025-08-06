import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import { Ratelimit } from "https://esm.sh/@upstash/ratelimit@1.1.3";
import { Redis } from "https://esm.sh/@upstash/redis@1.31.5";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.5";

// ---------------------------------
// Configurações de Ambiente
// ---------------------------------
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// Configuração do Rate Limiting com Upstash Redis
// Garanta que as variáveis UPSTASH_REDIS_URL e UPSTASH_REDIS_TOKEN 
// estejam configuradas nas variáveis de ambiente da sua função no Supabase.
const redis = Redis.fromEnv();
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "60 s"), // 20 requisições a cada 60 segundos
  analytics: true,
  prefix: "@upstash/ratelimit",
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ---------------------------------
// Validação de Entrada com Zod
// ---------------------------------
const RequestDataSchema = z.object({
  nicho: z.string().max(100).optional(),
  objetivo: z.string().max(200).optional(),
  descricao: z.string().max(500).optional(),
  formato: z.string().max(50).optional(),
  aiType: z.string().max(50).optional(),
  briefing: z.string().max(1000).optional(),
  publicoAlvo: z.string().max(200).optional(),
  tituloAnuncio: z.string().max(150).optional(),
  textoAnuncio: z.string().max(500).optional(),
  investimentoTotal: z.number().optional(),
  alcance: z.number().optional(),
  cliques: z.number().optional(),
  ctr: z.number().optional(),
  cpm: z.number().optional(),
  frequencia: z.number().optional(),
  taxaConversao: z.number().optional(),
  custoConversao: z.number().optional(),
});

const ChatRequestSchema = z.object({
  prompt: z.string().min(1, "O prompt é obrigatório.").max(4000),
  type: z.enum(['content', 'prompt', 'campaign', 'chat']),
  data: RequestDataSchema.optional(),
});

// ---------------------------------
// Lógica do Sistema de Prompts
// ---------------------------------
const buildSystemPrompt = (type: string, data: any = {}) => {
  // ... (a lógica de buildSystemPrompt permanece a mesma)
  switch (type) {
    case 'content':
      return `Crie uma estratégia de conteúdo para Instagram...`; // Mantido por brevidade
    case 'prompt':
      return `Crie um prompt profissional para IA...`; // Mantido por brevidade
    case 'campaign':
      return `Analise esta campanha de tráfego pago...`; // Mantido por brevidade
    case 'chat':
    default:
      return `Você é um assistente de marketing digital...`; // Mantido por brevidade
  }
};

// ---------------------------------
// Servidor Edge Function
// ---------------------------------
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. Validação de API Keys e Variáveis de Ambiente
    if (!openAIApiKey || !supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Variáveis de ambiente essenciais não configuradas.');
    }

    // 2. Autenticação do Usuário
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
    const { data: { user } } = await supabaseAdmin.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Autenticação necessária.' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // 3. Rate Limiting
    const { success, limit, remaining, reset } = await ratelimit.limit(user.id);
    if (!success) {
      const resetTime = new Date(reset).toLocaleTimeString();
      return new Response(JSON.stringify({ error: `Limite de requisições atingido. Tente novamente após ${resetTime}.` }), {
        status: 429,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }

    // 4. Validação do Corpo da Requisição
    const body = await req.json();
    const validationResult = ChatRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return new Response(JSON.stringify({ error: 'Dados inválidos.', details: validationResult.error.flatten() }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    const { prompt, type, data } = validationResult.data;

    // 5. Lógica Principal (chamada à OpenAI)
    console.log(`Processing ${type} request for user ${user.id}...`);
    const systemPrompt = buildSystemPrompt(type, data);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 1500,
        user: user.id, // Adiciona o user_id para monitoramento na OpenAI
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const responseData = await response.json();
    const generatedText = responseData.choices[0].message.content;

    return new Response(JSON.stringify({ generatedText, usage: responseData.usage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(JSON.stringify({ error: error.message || 'Erro interno do servidor.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
