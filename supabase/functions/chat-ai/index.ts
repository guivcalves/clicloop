import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatRequest {
  prompt: string;
  type: 'content' | 'prompt' | 'campaign' | 'chat';
  data?: any;
}

const buildSystemPrompt = (type: string, data: any = {}) => {
  switch (type) {
    case 'content':
      return `Crie uma estratégia de conteúdo para Instagram com base no seguinte contexto:

Nicho: ${data.nicho || 'Não especificado'}
Objetivo do conteúdo: ${data.objetivo || 'Não especificado'}
Descrição do usuário: ${data.descricao || 'Não especificado'}
Formato: ${data.formato || 'Não especificado'}

Retorne:
- Tema estratégico do post
- Formato ideal
- Estrutura do conteúdo
- Legenda com copy persuasiva
- Hashtags otimizadas e atualizadas
- Melhor horário para postar

Seja específico e prático nas suas sugestões.`;

    case 'prompt':
      return `Crie um prompt profissional para IA com base no seguinte briefing:

Nicho: ${data.nicho || 'Não especificado'}
Objetivo: ${data.objetivo || 'Não especificado'}
Tipo de IA: ${data.aiType || 'Não especificado'}
Briefing do usuário: ${data.briefing || 'Não especificado'}

Retorne um prompt claro, eficaz e bem estruturado que maximize os resultados da IA escolhida.`;

    case 'campaign':
      return `Analise esta campanha de tráfego pago:

Objetivo da campanha: ${data.objetivo || 'Não especificado'}
Público-alvo: ${data.publicoAlvo || 'Não especificado'}
Criativo: Título: "${data.tituloAnuncio}" | Texto: "${data.textoAnuncio}"
Investimento: R$ ${data.investimentoTotal || '0'}

Resultados:
- Alcance: ${data.alcance || '0'}
- Cliques: ${data.cliques || '0'}
- CTR: ${data.ctr || '0'}%
- CPM: R$ ${data.cpm || '0'}
- Frequência: ${data.frequencia || '0'}
- Taxa de conversão: ${data.taxaConversao || '0'}%
- Custo por conversão: R$ ${data.custoConversao || '0'}

Retorne:
1. Diagnóstico da campanha
2. Ajustes estratégicos
3. Sugestões de novos criativos e segmentações
4. Recomendações de otimização de budget`;

    case 'chat':
    default:
      return `Você é um assistente de marketing digital experiente e especialista em IA. Responda com foco em tráfego pago, conteúdo, social media e ferramentas de IA. Use linguagem estratégica, clara e sempre atualizada com os algoritmos das redes sociais. Seja prático e objetivo nas suas respostas.`;
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { prompt, type, data }: ChatRequest = await req.json();

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    console.log(`Processing ${type} request with prompt: ${prompt.substring(0, 100)}...`);

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
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const responseData = await response.json();
    const generatedText = responseData.choices[0].message.content;

    console.log('Successfully generated response');

    return new Response(JSON.stringify({ 
      generatedText,
      usage: responseData.usage
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});