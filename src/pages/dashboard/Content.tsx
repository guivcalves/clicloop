import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Copy, Wand2, Clock, Hash, Target, Layout } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Content = () => {
  const [description, setDescription] = useState('');
  const [format, setFormat] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência.",
    });
  };

  const generateContent = async () => {
    if (!description || !format) {
      toast({
        variant: "destructive",
        title: "Preencha todos os campos",
        description: "Descrição e formato são obrigatórios.",
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
      // Buscar dados do perfil do usuário
      const { data: profile } = await supabase
        .from('profiles')
        .select('nicho')
        .eq('id', user.id)
        .single();

      // Chamar edge function da OpenAI
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('chat-ai', {
        body: {
          prompt: description,
          type: 'content',
          data: {
            nicho: profile?.nicho || 'Marketing Digital',
            objetivo: 'Engajamento e crescimento no Instagram',
            descricao: description,
            formato: format
          }
        }
      });

      if (aiError) throw aiError;

      const generatedText = aiResponse.generatedText;

      // Extrair informações do texto gerado da IA
      const lines = generatedText.split('\n').filter(line => line.trim());
      const theme = lines.find(line => line.includes('Tema')) || `Tema para ${format}`;
      const structure = lines.slice(0, 5).join('\n');
      const caption = lines.find(line => line.length > 50) || generatedText.substring(0, 200);
      const hashtags = lines.find(line => line.includes('#')) || '#marketing #digitalmarketing #clienteja';
      const bestTime = lines.find(line => line.includes('horário') || line.includes('hora')) || 'Entre 18h e 21h';

      setResults({
        theme: theme.replace(/^.*?:/, '').trim(),
        idealFormat: format,
        structure: structure,
        caption: caption,
        hashtags: hashtags,
        bestTime: bestTime.replace(/^.*?:/, '').trim()
      });

      // Salvar no banco de dados
      const { error: dbError } = await supabase
        .from('conteudos_gerados')
        .insert({
          user_id: user.id,
          descricao: description,
          formato: format,
          tema: theme.replace(/^.*?:/, '').trim(),
          estrutura: structure,
          legenda: caption,
          hashtags: hashtags,
          horario_postagem: bestTime.replace(/^.*?:/, '').trim()
        });

      if (dbError) {
        console.error('Erro ao salvar conteúdo:', dbError);
        toast({
          variant: "destructive",
          title: "Erro ao salvar",
          description: "Conteúdo gerado, mas não foi possível salvar no histórico.",
        });
      } else {
        toast({
          title: "Conteúdo gerado com sucesso!",
          description: "Seu conteúdo foi criado e salvo no histórico.",
        });
      }

    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar conteúdo",
        description: "Tente novamente em alguns instantes.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Criador de Conteúdo</h1>
        <p className="text-muted-foreground">
          Gere conteúdo otimizado para suas redes sociais com IA
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            Geração de Conteúdo
          </CardTitle>
          <CardDescription>
            Descreva o conteúdo que você quer criar e escolha o formato
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição do conteúdo</Label>
            <Textarea
              id="description"
              placeholder="Ex: Dicas para aumentar vendas no e-commerce, tutorial de marketing digital..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="format">Formato do post</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carrossel">Carrossel</SelectItem>
                <SelectItem value="reels">Reels</SelectItem>
                <SelectItem value="estatico">Conteúdo Único</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={generateContent}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-primary hover:opacity-90 transition-fast"
          >
            {loading ? "Gerando..." : "Gerar Conteúdo com IA"}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-4 w-4" />
                Tema Sugerido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{results.theme}</p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(results.theme)}
                className="w-full rounded-xl"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copiar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layout className="h-4 w-4" />
                Formato Ideal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{results.idealFormat}</p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(results.idealFormat)}
                className="w-full rounded-xl"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copiar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layout className="h-4 w-4" />
                Estrutura
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3 whitespace-pre-line">{results.structure}</p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(results.structure)}
                className="w-full rounded-xl"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copiar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wand2 className="h-4 w-4" />
                Legenda Pronta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{results.caption}</p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(results.caption)}
                className="w-full rounded-xl"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copiar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Hash className="h-4 w-4" />
                Hashtags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{results.hashtags}</p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(results.hashtags)}
                className="w-full rounded-xl"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copiar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-4 w-4" />
                Melhor Horário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{results.bestTime}</p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(results.bestTime)}
                className="w-full rounded-xl"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copiar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Content;