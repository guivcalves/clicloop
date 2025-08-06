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
  Sparkles,
  TrendingUp,
  Users,
  Eye,
  Heart,
  ChevronRight,
  Crown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Overview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const statsCards = [
    {
      title: "Ferramentas Ativas",
      value: "6",
      icon: Brain,
      bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50",
      iconColor: "text-indigo-600"
    },
    {
      title: "Conteúdos Criados",
      value: "127",
      icon: FileText,
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Prompts Gerados",
      value: "89",
      icon: Sparkles,
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              Bem-vindo ao Cliente Já, {user?.name || 'John Doe'}!
            </h1>
            <p className="text-gray-600 mb-6 max-w-md">
              Escolha uma ferramenta para começar a criar conteúdo otimizado 
              e impulsionar seus resultados com inteligência artificial.
            </p>
            <div className="flex items-center gap-2 text-indigo-600 mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">Potencializado por IA</span>
            </div>
          </div>
          <div className="flex-shrink-0 ml-8">
            <div className="w-64 h-48 bg-gradient-to-br from-indigo-400 via-purple-500 to-purple-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-600/20"></div>
              <div className="relative text-white text-6xl">🚀</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Tools */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                Ações Rápidas
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => navigate('/dashboard/conteudo')}
                className="h-auto p-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl"
              >
                <div className="flex flex-col items-center gap-3">
                  <FileText className="h-8 w-8" />
                  <span className="font-medium">Criar Conteúdo</span>
                </div>
              </Button>
              <Button 
                onClick={() => navigate('/dashboard/prompts')}
                variant="outline"
                className="h-auto p-6 rounded-xl border-2 hover:bg-indigo-50 hover:border-indigo-300"
              >
                <div className="flex flex-col items-center gap-3">
                  <Brain className="h-8 w-8 text-purple-600" />
                  <span className="font-medium">Gerar Prompt</span>
                </div>
              </Button>
              <Button 
                onClick={() => navigate('/dashboard/chat')}
                variant="outline"
                className="h-auto p-6 rounded-xl border-2 hover:bg-purple-50 hover:border-purple-300"
              >
                <div className="flex flex-col items-center gap-3">
                  <MessageCircle className="h-8 w-8 text-indigo-600" />
                  <span className="font-medium">Chat com IA</span>
                </div>
              </Button>
            </div>
          </div>

          {/* All Tools */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Todas as Ferramentas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group border-0 shadow-sm">
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
                          <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={() => navigate(tool.path)}
                      variant="outline" 
                      className="w-full rounded-xl group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white transition-all"
                    >
                      Usar ferramenta
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Tips and Info */}
        <div className="space-y-8">
          {/* Tip Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-900">💡 Dica do dia</h3>
                <p className="text-gray-700 mb-3 text-sm">
                  Combine o <strong>Criador de Conteúdo</strong> com o <strong>Construtor de Prompts</strong> 
                  para criar campanhas ainda mais eficazes!
                </p>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/dashboard/conteudo')}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  Experimentar agora
                </Button>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              Recursos Premium
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                Análises avançadas
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                Templates exclusivos
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                Suporte prioritário
              </div>
            </div>
            <Button 
              onClick={() => navigate('/billing')}
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              Fazer upgrade
            </Button>
          </div>

          {/* Support Card */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-gray-900">Precisa de ajuda?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Nossa equipe está sempre pronta para ajudar você a aproveitar ao máximo o Cliente Já.
            </p>
            <Button 
              onClick={() => navigate('/dashboard/suporte')}
              variant="outline"
              className="w-full hover:bg-indigo-50 hover:border-indigo-300"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Obter Suporte
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;