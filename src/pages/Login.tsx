import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Cliente Já!",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "E-mail ou senha incorretos.",
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
          <CardTitle>Entrar na sua conta</CardTitle>
          <CardDescription>
            Digite suas credenciais para acessar o painel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              />
            </div>
            <Button 
              type="submit" 
              className="w-full rounded-xl bg-gradient-primary hover:opacity-90 transition-fast"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <div className="text-center mt-4">
            <span className="text-muted-foreground">Não tem uma conta? </span>
            <Link to="/register" className="text-brand-primary hover:underline font-medium">
              Criar conta
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;