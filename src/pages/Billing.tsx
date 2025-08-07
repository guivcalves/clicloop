import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Billing = () => {
  const { toast } = useToast();

  const handleSubscribe = () => {
    toast({
      title: "Redirecionando para pagamento",
      description: "Você será redirecionado para o Stripe em breve.",
    });
    // Aqui será integrado o Stripe futuramente
  };

  const features = [
    "Criador de Conteúdo com IA",
    "Construtor de Prompts",
    "Analisador de Campanhas",
    "Chat com IA ilimitado",
    "Suporte prioritário",
    "Atualizações constantes"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-brand-primary mr-2" />
            <h1 className="text-2xl font-bold text-brand-primary">ClicLoop</h1>
          </div>
          <h2 className="text-2xl font-bold mb-2">Assine para desbloquear todas as ferramentas</h2>
          <p className="text-muted-foreground">
            Acesse todas as funcionalidades premium e turbine seu negócio
          </p>
        </div>

        <Card className="shadow-medium">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CardTitle className="text-2xl">Plano Premium</CardTitle>
              <Badge className="bg-brand-primary text-white">Recomendado</Badge>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span className="text-3xl font-bold">R$ 29,90</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
            <CardDescription>
              Tudo que você precisa para escalar seu negócio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              onClick={handleSubscribe}
              className="w-full rounded-xl bg-gradient-primary hover:opacity-90 transition-fast"
              size="lg"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Assinar agora
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Pagamento seguro via Stripe. Cancele a qualquer momento.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Billing;