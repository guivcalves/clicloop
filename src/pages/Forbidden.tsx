import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldX, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md text-center shadow-medium">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <ShieldX className="h-16 w-16 text-brand-primary" />
          </div>
          <CardTitle className="text-2xl">403</CardTitle>
          <CardDescription>
            Ops! Algo deu errado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Você não tem permissão para acessar esta página.
          </p>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="rounded-xl bg-gradient-primary hover:opacity-90 transition-fast"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o painel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Forbidden;