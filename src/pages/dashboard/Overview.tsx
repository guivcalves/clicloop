import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Brain, 
  BarChart3, 
  MessageCircle, 
  HelpCircle, 
  Lightbulb,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Criador de Conteúdo",
      description: "Gere conteúdo otimizado para suas redes sociais com IA",
      icon: FileText,
      path: "/dashboard/conteudo",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      features: ["Legendas automáticas", "Hashtags inteligentes", "Estrutura otimizada"]
    },
    {
      title: "Construtor de Prompts",
      description: "Crie prompts perfeitos para qualquer situação",
      icon: Brain,
      path: "/dashboard/prompts",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      features: ["Templates prontos", "Otimização automática", "Multi-plataforma"]
    },
    {
      title: "Analisador de Campanhas",
      description: "Analise e otimize suas campanhas publicitárias",
      icon: BarChart3,
      path: "/dashboard/analise",
      color: "text-green-500",
      bgColor: "bg-green-50",
      features: ["Diagnóstico detalhado", "Sugestões de melhoria", "ROI otimizado"]
    },
    {
      title: "Chat com IA",
      description: "Converse com nossa IA especializada em marketing",
      icon: MessageCircle,
      path: "/dashboard/chat",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      features: ["Respostas instantâneas", "Contexto personalizado", "24/7 disponível"]
    },
    {
      title: "Suporte",
      description: "Obtenha ajuda quando precisar",
      icon: HelpCircle,
      path: "/dashboard/suporte",
      color: "text-red-500",
      bgColor: "bg-red-50",
      features: ["Sempre disponível", "Resposta rápida", "Suporte especializado"]
    },
    {
      title: "Sugestões",
      description: "Compartilhe suas ideias para melhorar a plataforma",
      icon: Lightbulb,
      path: "/dashboard/sugestoes",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      features: ["Feedback direto", "Influencie o roadmap", "Comunidade ativa"]
    }
  ];


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao Cliente Já! Escolha uma ferramenta para começar
          </p>
        </div>
        <div className="flex items-center gap-2 text-brand-primary">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-medium">Potencializado por IA</span>
        </div>
      </div>


      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Ações Rápidas
          </CardTitle>
          <CardDescription>
            Acesse rapidamente as ferramentas mais utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button 
              onClick={() => navigate('/dashboard/conteudo')}
              className="h-auto p-4 bg-gradient-primary hover:opacity-90 transition-fast"
            >
              <div className="flex flex-col items-center gap-2">
                <FileText className="h-6 w-6" />
                <span>Criar Conteúdo</span>
              </div>
            </Button>
            <Button 
              onClick={() => navigate('/dashboard/prompts')}
              variant="outline"
              className="h-auto p-4 rounded-xl"
            >
              <div className="flex flex-col items-center gap-2">
                <Brain className="h-6 w-6" />
                <span>Gerar Prompt</span>
              </div>
            </Button>
            <Button 
              onClick={() => navigate('/dashboard/chat')}
              variant="outline"
              className="h-auto p-4 rounded-xl"
            >
              <div className="flex flex-col items-center gap-2">
                <MessageCircle className="h-6 w-6" />
                <span>Chat com IA</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* All Tools */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Todas as Ferramentas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-xl ${tool.bgColor} flex items-center justify-center mb-3`}>
                  <tool.icon className={`h-6 w-6 ${tool.color}`} />
                </div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => navigate(tool.path)}
                  variant="outline" 
                  className="w-full rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-colors"
                >
                  Usar ferramenta
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">💡 Dica do dia</h3>
              <p className="text-muted-foreground mb-3">
                Combine o <strong>Criador de Conteúdo</strong> com o <strong>Construtor de Prompts</strong> 
                para criar campanhas ainda mais eficazes. Use prompts personalizados para gerar 
                conteúdo específico para sua audiência!
              </p>
              <Button 
                size="sm" 
                onClick={() => navigate('/dashboard/conteudo')}
                className="bg-brand-primary hover:bg-brand-primary/90"
              >
                Experimentar agora
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;