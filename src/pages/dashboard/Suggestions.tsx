import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Lightbulb, Send, Heart, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Suggestions = () => {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!suggestion.trim()) {
      toast({
        variant: "destructive",
        title: "Digite sua sugestão",
        description: "Por favor, escreva sua sugestão antes de enviar.",
      });
      return;
    }

    setLoading(true);
    
    // Simular envio da sugestão (substituir por integração Supabase futuramente)
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setSuggestion('');
      toast({
        title: "Sugestão enviada!",
        description: "Obrigado pela sugestão! Vamos considerar com carinho.",
      });
    }, 1000);
  };

  const suggestions = [
    {
      title: "Integração com Redes Sociais",
      description: "Conectar diretamente com Instagram e Facebook para publicação automática",
      votes: 15
    },
    {
      title: "Templates Prontos",
      description: "Biblioteca de templates para diferentes nichos e tipos de conteúdo",
      votes: 12
    },
    {
      title: "Agendamento de Posts",
      description: "Funcionalidade para agendar publicações em horários otimizados",
      votes: 8
    },
    {
      title: "Análise de Concorrentes",
      description: "Ferramenta para analisar estratégias de conteúdo dos concorrentes",
      votes: 6
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sugestões</h1>
        <p className="text-muted-foreground">
          Ajude-nos a melhorar o Cliente Já com suas ideias e feedback
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Sugira uma melhoria
          </CardTitle>
          <CardDescription>
            Sua opinião é muito importante para nós. Conte-nos o que você gostaria de ver no Cliente Já!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="suggestion">O que você gostaria de ver no Cliente Já?</Label>
                <Textarea
                  id="suggestion"
                  placeholder="Descreva sua ideia, funcionalidade ou melhoria que gostaria de ver na plataforma..."
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  className="rounded-xl min-h-[120px]"
                />
              </div>
              <Button 
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-primary hover:opacity-90 transition-fast"
              >
                {loading ? "Enviando..." : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar sugestão
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Obrigado pela sugestão!</h3>
              <p className="text-muted-foreground mb-4">
                Vamos considerar com carinho e você pode enviar mais sugestões quando quiser.
              </p>
              <Button 
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="rounded-xl"
              >
                Enviar nova sugestão
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default Suggestions;