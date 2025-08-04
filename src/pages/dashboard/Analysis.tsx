import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { BarChart, Target, Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type CampaignFormData = {
  target: string;
  objective: string;
  adTitle: string;
  adText: string;
  link?: string;
  investment: string;
  reach?: string;
  clicks?: string;
  ctr?: string;
  cpm?: string;
  frequency?: string;
  conversionRate?: string;
  costPerConversion?: string;
  roas?: string;
  observations?: string;
  channels: string[];
  duration: string;
};

const channels = [
  { id: 'instagram_feed', label: 'Feed do Instagram' },
  { id: 'instagram_stories', label: 'Stories' },
  { id: 'instagram_reels', label: 'Reels' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'messenger', label: 'Messenger' },
];

const Analysis = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();
  
  const form = useForm<CampaignFormData>({
    defaultValues: {
      target: '',
      objective: '',
      adTitle: '',
      adText: '',
      link: '',
      investment: '',
      reach: '',
      clicks: '',
      ctr: '',
      cpm: '',
      frequency: '',
      conversionRate: '',
      costPerConversion: '',
      roas: '',
      observations: '',
      channels: [],
      duration: '',
    },
  });

  const onSubmit = async (data: CampaignFormData) => {
    console.log('Form data:', data);
    if (!data.target || !data.objective || !data.adTitle || !data.adText || !data.investment) {
      toast({
        variant: "destructive",
        title: "Preencha os campos obrigatórios",
        description: "Público-alvo, objetivo, título, texto e investimento são obrigatórios.",
      });
      return;
    }

    setLoading(true);
    
    // Simular análise (substituir por IA futuramente)
    setTimeout(() => {
      const objective = data.objective;
      let specificSuggestions = [];
      
      if (objective === 'RECOGNITION') {
        specificSuggestions = [
          "Seu CPM parece alto para campanhas de reconhecimento - teste criativos mais simples ou vídeos curtos",
          "Para reconhecimento, foque em alcance amplo e frequência controlada (máximo 2.0)",
        ];
      } else if (objective === 'LEADS') {
        specificSuggestions = [
          "A taxa de conversão está baixa - otimize a página de destino ou simplifique o formulário",
          "Seu custo por lead pode ser reduzido testando novos públicos similares",
        ];
      } else if (objective === 'SALES') {
        specificSuggestions = [
          data.roas ? `Com ROAS de ${data.roas}, considere aumentar o orçamento para escalar` : "Adicione o pixel de conversão para medir ROAS",
          "Teste criativos com urgência e prova social para melhorar conversões",
        ];
      }

      setAnalysis({
        score: 7.5,
        diagnosis: `Sua campanha de ${objective.toLowerCase()} tem um bom potencial, mas pode ser otimizada considerando as métricas específicas deste tipo de objetivo.`,
        improvements: [
          ...specificSuggestions,
          data.frequency && parseFloat(data.frequency) > 3 ? "A frequência está alta (acima de 3.0) - o público pode estar saturado" : "Monitore a frequência para evitar saturação do público",
          data.ctr && parseFloat(data.ctr) < 1 ? "CTR baixo - teste novos títulos e criativos mais chamativos" : "CTR está dentro do esperado",
          data.channels.length > 0 ? `Otimize a performance nos canais: ${data.channels.join(', ')}` : "Considere testar diferentes canais para expandir o alcance",
        ].filter(Boolean),
        newCreatives: [
          "🚀 Título sugerido: \"Descubra o Segredo que 90% dos Empreendedores Não Sabem\"",
          "💡 Texto alternativo: \"Transforme seu negócio em 30 dias com nossa metodologia comprovada. Mais de 1000 clientes satisfeitos já viram resultados reais.\"",
          "🎯 CTA otimizado: \"Quero Transformar Meu Negócio Agora\"",
          data.objective === 'SALES' ? "💰 Versão para vendas: \"Últimas 24h: Desconto de 50% (apenas 100 vagas)\"" : "",
        ].filter(Boolean),
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analisador de Campanhas</h1>
        <p className="text-muted-foreground">
          Analise e otimize suas campanhas publicitárias com IA
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Dados da Campanha
              </CardTitle>
              <CardDescription>
                Preencha as informações da sua campanha para análise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="target"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Público-alvo *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Empreendedores de 25-45 anos..."
                          className="rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="objective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objetivo da campanha *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Selecione o objetivo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="RECOGNITION">Reconhecimento</SelectItem>
                          <SelectItem value="TRAFFIC">Tráfego</SelectItem>
                          <SelectItem value="ENGAGEMENT">Engajamento</SelectItem>
                          <SelectItem value="LEADS">Leads</SelectItem>
                          <SelectItem value="APP_PROMOTION">Promoção do app</SelectItem>
                          <SelectItem value="SALES">Vendas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="adTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título do anúncio *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o título do seu anúncio"
                          className="rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="investment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investimento total *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: R$ 500,00"
                          className="rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="adText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto do anúncio *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cole o texto completo do seu anúncio aqui..."
                        className="rounded-xl min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link de destino</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://..."
                          className="rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duração da campanha</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Selecione a duração" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 dia</SelectItem>
                          <SelectItem value="3">3 dias</SelectItem>
                          <SelectItem value="7">7 dias</SelectItem>
                          <SelectItem value="14">14 dias</SelectItem>
                          <SelectItem value="30">30 dias</SelectItem>
                          <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Métricas de Performance */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Métricas de Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="reach"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alcance</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: 10.000"
                            className="rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clicks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cliques</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: 250"
                            className="rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ctr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CTR (%)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: 2.5"
                            className="rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cpm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPM (R$)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: 15.50"
                            className="rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequência</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: 2.1"
                            className="rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="conversionRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taxa de conversão (%)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: 3.5"
                            className="rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="costPerConversion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custo por conversão (R$)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: 25.00"
                            className="rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ROAS (opcional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: 4.5"
                            className="rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Canais Utilizados */}
              <FormField
                control={form.control}
                name="channels"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Canais utilizados</FormLabel>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {channels.map((channel) => (
                        <FormItem
                          key={channel.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(channel.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, channel.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== channel.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {channel.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Observações */}
              <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações adicionais (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva detalhes importantes como segmentação, criativos testados, estratégia atual, mudanças feitas..."
                        className="rounded-xl min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-primary hover:opacity-90 transition-fast"
              >
                {loading ? "Analisando..." : "Analisar Campanha com IA"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>

      {analysis && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Diagnóstico da Campanha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl font-bold text-brand-primary">{analysis.score}/10</div>
                <div className="flex-1">
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-gradient-primary h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${analysis.score * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">{analysis.diagnosis}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Sugestões de Melhoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.improvements.map((improvement: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-brand-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Novos Criativos Sugeridos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.newCreatives.map((creative: string, index: number) => (
                  <div key={index} className="bg-muted rounded-xl p-3">
                    <p className="text-sm">{creative}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Analysis;