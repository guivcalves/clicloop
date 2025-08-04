import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(name, email, password);
      toast({
        title: "Conta criada com sucesso!",
        description: "Vamos personalizar sua experiência.",
      });
      navigate('/onboarding');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md shadow-medium">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-brand-primary mr-2" />
            <h1 className="text-2xl font-bold text-brand-primary">Cliente Já</h1>
          </div>
          <CardTitle>Criar sua conta</CardTitle>
          <CardDescription>
            Comece a usar ferramentas de IA para o seu negócio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl"
                minLength={6}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full rounded-xl bg-gradient-primary hover:opacity-90 transition-fast"
              disabled={loading}
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
          <div className="text-center mt-4">
            <span className="text-muted-foreground">Já tem uma conta? </span>
            <Link to="/login" className="text-brand-primary hover:underline font-medium">
              Entrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;