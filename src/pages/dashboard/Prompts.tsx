import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Copy, Brain, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Prompts = () => {
  const [niche, setNiche] = useState('');
  const [objective, setObjective] = useState('');
  const [briefing, setBriefing] = useState('');
  const [aiType, setAiType] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const { toast } = useToast();

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

    setLoading(true);
    
    // Simular geração de prompt (substituir por IA futuramente)
    setTimeout(() => {
      const prompt = `Você é um especialista em ${niche}. Seu objetivo é ${objective}.

Contexto e briefing:
${briefing}

Instruções específicas para ${aiType.toLowerCase()}:
- Seja preciso e relevante para o nicho de ${niche}
- Mantenha o foco no objetivo: ${objective}
- Use uma linguagem profissional mas acessível
- Forneça exemplos práticos quando possível
- Estruture a resposta de forma clara e organizada

Por favor, desenvolva uma resposta completa e acionável baseada nessas diretrizes.`;

      setGeneratedPrompt(prompt);
      setLoading(false);
    }, 1500);
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