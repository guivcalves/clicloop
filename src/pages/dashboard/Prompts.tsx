import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Copy, Brain, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Prompts = () => {
  const [niche, setNiche] = useState('');
  const [objective, setObjective] = useState('');
  const [briefing, setBriefing] = useState('');
  const [aiType, setAiType] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Prompt copiado!",
      description: "O prompt foi copiado para a área de transferência.",
    });
  };

  const generatePrompt = async () => {
    if (!niche || !objective || !briefing || !aiType) {
      toast({
        variant: "destructive",
        title: "Preencha todos os campos",
        description: "Todos os campos são obrigatórios para gerar o prompt.",
      });
      return;
    }

    if (!user) {
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: "Você precisa estar logado para usar esta funcionalidade.",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Chamar edge function da OpenAI
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('chat-ai', {
        body: {
          prompt: `Crie um prompt profissional para ${aiType} focado em ${niche} com o objetivo de ${objective}. Briefing: ${briefing}`,
          type: 'prompt',
          data: {
            nicho: niche,
            objetivo: objective,
            aiType: aiType,
            briefing: briefing
          }
        }
      });

      if (aiError) throw aiError;

      const generatedText = aiResponse.generatedText;
      setGeneratedPrompt(generatedText);

      // Salvar no banco de dados
      const { error: dbError } = await supabase
        .from('prompts_gerados')
        .insert({
          user_id: user.id,
          nicho: niche,
          objetivo: objective,
          tipo_ia: aiType,
          briefing: briefing,
          prompt_gerado: generatedText
        });

      if (dbError) {
        console.error('Erro ao salvar prompt:', dbError);
        toast({
          variant: "destructive",
          title: "Erro ao salvar",
          description: "Prompt gerado, mas não foi possível salvar no histórico.",
        });
      } else {
        toast({
          title: "Prompt criado com sucesso!",
          description: "Seu prompt foi gerado e salvo no histórico.",
        });
      }

    } catch (error) {
      console.error('Erro ao gerar prompt:', error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar prompt",
        description: "Tente novamente em alguns instantes.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Construtor de Prompts</h1>
        <p className="text-muted-foreground">
          Crie prompts otimizados para diferentes tipos de IA
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Configuração do Prompt
          </CardTitle>
          <CardDescription>
            Preencha as informações para gerar um prompt personalizado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="niche">Nicho</Label>
              <Input
                id="niche"
                placeholder="Ex: Marketing Digital, Saúde, Educação..."
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="objective">Objetivo do prompt</Label>
              <Input
                id="objective"
                placeholder="Ex: Criar conteúdo educativo, gerar leads..."
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="briefing">Briefing</Label>
            <Textarea
              id="briefing"
              placeholder="Descreva detalhadamente o que você quer que a IA faça, incluindo contexto, tom de voz, público-alvo..."
              value={briefing}
              onChange={(e) => setBriefing(e.target.value)}
              className="rounded-xl min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aiType">Tipo de IA</Label>
            <Select value={aiType} onValueChange={setAiType}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Selecione o tipo de IA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="texto">Texto (ChatGPT, Claude, etc.)</SelectItem>
                <SelectItem value="imagem">Imagem (DALL-E, Midjourney, etc.)</SelectItem>
                <SelectItem value="codigo">Código (GitHub Copilot, CodeT5, etc.)</SelectItem>
                <SelectItem value="video">Vídeo (Runway, Pika Labs, etc.)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={generatePrompt}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-primary hover:opacity-90 transition-fast"
          >
            {loading ? "Gerando..." : "Gerar Prompt"}
          </Button>
        </CardContent>
      </Card>

      {generatedPrompt && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Prompt Gerado
            </CardTitle>
            <CardDescription>
              Seu prompt personalizado está pronto para uso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-xl p-4">
              <pre className="whitespace-pre-wrap text-sm font-mono">{generatedPrompt}</pre>
            </div>
            <Button 
              onClick={copyPrompt}
              className="w-full rounded-xl bg-gradient-primary hover:opacity-90 transition-fast"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copiar Prompt
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Prompts;