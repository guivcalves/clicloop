import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, FileText, Clock } from 'lucide-react';

const Support = () => {
  const handleEmailSupport = () => {
    window.open('mailto:admclicloop@gmail.com?subject=Suporte ClicLoop&body=Olá, preciso de ajuda com:', '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Suporte</h1>
        <p className="text-muted-foreground">
          Precisa de ajuda? Nossa equipe está pronta para atendê-lo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Suporte por E-mail
            </CardTitle>
            <CardDescription>
              Fale diretamente com nosso time de suporte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Envie sua dúvida ou problema para nossa equipe especializada. 
              Respondemos em até 24 horas.
            </p>
            <Button 
              onClick={handleEmailSupport}
              className="w-full rounded-xl bg-gradient-primary hover:opacity-90 transition-fast"
            >
              <Mail className="h-4 w-4 mr-2" />
              Enviar e-mail
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat com IA
            </CardTitle>
            <CardDescription>
              Use nossa assistente de IA para ajuda imediata
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Nossa IA pode responder dúvidas frequentes e ajudar com 
              funcionalidades básicas da plataforma.
            </p>
            <Button 
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => window.location.href = '/dashboard/chat'}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Abrir chat
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dúvidas Frequentes
          </CardTitle>
          <CardDescription>
            Respostas para as perguntas mais comuns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-brand-primary pl-4">
              <h4 className="font-medium mb-1">Como posso cancelar minha assinatura?</h4>
              <p className="text-sm text-muted-foreground">
                Você pode cancelar sua assinatura a qualquer momento através do menu da sua conta 
                ou entrando em contato conosco por e-mail.
              </p>
            </div>

            <div className="border-l-4 border-brand-primary pl-4">
              <h4 className="font-medium mb-1">As ferramentas de IA funcionam em português?</h4>
              <p className="text-sm text-muted-foreground">
                Sim! Todas as nossas ferramentas são otimizadas para o português brasileiro 
                e adaptadas ao mercado nacional.
              </p>
            </div>

            <div className="border-l-4 border-brand-primary pl-4">
              <h4 className="font-medium mb-1">Posso testar antes de assinar?</h4>
              <p className="text-sm text-muted-foreground">
                Você pode explorar a plataforma gratuitamente. Para acesso completo às 
                ferramentas de IA, é necessária a assinatura premium.
              </p>
            </div>

            <div className="border-l-4 border-brand-primary pl-4">
              <h4 className="font-medium mb-1">Como funciona o suporte técnico?</h4>
              <p className="text-sm text-muted-foreground">
                Oferecemos suporte por e-mail para todos os usuários. Assinantes premium 
                recebem suporte prioritário com resposta em até 24 horas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Horário de Atendimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium mb-2">Suporte por E-mail</p>
              <p className="text-muted-foreground">Sempre disponível</p>
              <p className="text-muted-foreground">Resposta em até 24h</p>
            </div>
            <div>
              <p className="font-medium mb-2">Chat com IA</p>
              <p className="text-muted-foreground">Sempre disponível</p>
              <p className="text-muted-foreground">Respostas instantâneas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;