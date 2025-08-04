import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, ArrowRight } from 'lucide-react';

const Onboarding = () => {
  const [niche, setNiche] = useState('');
  const [helpDescription, setHelpDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      updateUser({ niche, helpDescription });
      toast({
        title: "Perfil configurado!",
        description: "Agora você pode acessar todas as ferramentas.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-lg shadow-medium">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-brand-primary mr-2" />
            <h1 className="text-2xl font-bold text-brand-primary">Cliente Já</h1>
          </div>
          <CardTitle className="text-2xl">Vamos personalizar sua experiência</CardTitle>
          <CardDescription>
            Conte-nos mais sobre você para oferecermos as melhores ferramentas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="niche">Qual seu nicho?</Label>
              <Input
                id="niche"
                type="text"
                placeholder="Ex: Marketing Digital, Consultoria, E-commerce..."
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="help">Como você ajuda seus clientes?</Label>
              <Textarea
                id="help"
                placeholder="Descreva como você atende seus clientes e quais problemas resolve..."
                value={helpDescription}
                onChange={(e) => setHelpDescription(e.target.value)}
                required
                className="rounded-xl min-h-[100px]"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full rounded-xl bg-gradient-primary hover:opacity-90 transition-fast"
              disabled={loading}
            >
              {loading ? "Salvando..." : (
                <>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;