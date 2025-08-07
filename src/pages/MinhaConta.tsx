import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Download, Trash2, Shield, ArrowLeft } from 'lucide-react';

const MinhaConta = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [nome, setNome] = useState('');
  const [nicho, setNicho] = useState('');
  const [comoAjuda, setComoAjuda] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);

  useEffect(() => {
    if (user) {
      setNome(user.name || '');
      setNicho(user.niche || '');
      setComoAjuda(user.helpDescription || '');
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          nome,
          nicho: nicho || null,
          como_ajuda: comoAjuda || null,
        })
        .eq('id', user?.id);

      if (error) throw error;

      // Log de auditoria será implementado após migração
      console.log('Perfil atualizado para usuário:', user?.id);

      toast({
        title: "Perfil atualizado",
        description: "Seus dados foram salvos com sucesso."
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast({
        title: "Erro ao atualizar",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    setLoadingExport(true);

    try {
      // Buscar todos os dados do usuário
      const [profileRes, suggestoesRes, chatRes, promptsRes, campanhasRes, conteudosRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user?.id).single(),
        supabase.from('sugestoes').select('*').eq('user_id', user?.id),
        supabase.from('chat_mensagens').select('*').eq('user_id', user?.id),
        supabase.from('prompts_gerados').select('*').eq('user_id', user?.id),
        supabase.from('campanhas_analisadas').select('*').eq('user_id', user?.id),
        supabase.from('conteudos_gerados').select('*').eq('user_id', user?.id)
      ]);

      const userData = {
        perfil: profileRes.data,
        sugestoes: suggestoesRes.data,
        chat_mensagens: chatRes.data,
        prompts_gerados: promptsRes.data,
        campanhas_analisadas: campanhasRes.data,
        conteudos_gerados: conteudosRes.data,
        exportado_em: new Date().toISOString()
      };

      // Criar arquivo para download
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `meus-dados-cliente-ja-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);

      // Log de auditoria será implementado após migração
      console.log('Dados exportados para usuário:', user?.id);

      toast({
        title: "Dados exportados",
        description: "Seus dados foram baixados com sucesso."
      });
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      toast({
        title: "Erro na exportação",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoadingExport(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoadingDelete(true);

    try {
      // Log de auditoria será implementado após migração
      console.log('Conta sendo excluída para usuário:', user?.id);

      // Deletar dados do usuário (o CASCADE vai cuidar das tabelas relacionadas)
      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user?.id);

      if (deleteError) throw deleteError;

      // Fazer logout
      await logout();

      toast({
        title: "Conta excluída",
        description: "Sua conta foi excluída com sucesso. Seus dados foram removidos conforme previsto na LGPD."
      });

      navigate('/login');
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      toast({
        title: "Erro na exclusão",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Minha Conta</h1>
            <p className="text-muted-foreground">Gerencie seus dados pessoais e privacidade</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Editar Dados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Meus Dados
              </CardTitle>
              <CardDescription>
                Atualize suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="rounded-xl bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    O e-mail não pode ser alterado
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nicho">Nicho</Label>
                  <Input
                    id="nicho"
                    value={nicho}
                    onChange={(e) => setNicho(e.target.value)}
                    placeholder="Ex: Marketing Digital"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comoAjuda">Como posso te ajudar?</Label>
                  <Textarea
                    id="comoAjuda"
                    value={comoAjuda}
                    onChange={(e) => setComoAjuda(e.target.value)}
                    placeholder="Descreva como podemos te ajudar..."
                    className="rounded-xl"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl"
                >
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Direitos LGPD */}
          <div className="space-y-6">
            {/* Exportar Dados */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Exportar Dados
                </CardTitle>
                <CardDescription>
                  Baixe todos os seus dados (direito à portabilidade)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleExportData}
                  disabled={loadingExport}
                  variant="outline"
                  className="w-full rounded-xl"
                >
                  {loadingExport ? "Exportando..." : "Baixar Meus Dados"}
                </Button>
              </CardContent>
            </Card>

            {/* Excluir Conta */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="h-5 w-5" />
                  Excluir Conta
                </CardTitle>
                <CardDescription>
                  Exclua permanentemente sua conta e todos os dados (direito ao esquecimento)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full rounded-xl"
                      disabled={loadingDelete}
                    >
                      {loadingDelete ? "Excluindo..." : "Excluir Minha Conta"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Todos os seus dados serão
                        permanentemente excluídos de nossos servidores conforme a LGPD.
                        Isso inclui:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Perfil e informações pessoais</li>
                          <li>Histórico de conversas e prompts</li>
                          <li>Campanhas analisadas</li>
                          <li>Conteúdos gerados</li>
                          <li>Logs de auditoria</li>
                        </ul>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Sim, excluir permanentemente
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            {/* Informações LGPD */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Seus Direitos
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>De acordo com a LGPD, você tem direito a:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos ou incorretos</li>
                  <li>Solicitar a exclusão de dados (direito ao esquecimento)</li>
                  <li>Solicitar a portabilidade dos dados</li>
                  <li>Revogar o consentimento</li>
                </ul>
                <p className="mt-4">
                  <strong>Encarregado (DPO):</strong> Cliente Já<br />
                  <strong>Contato:</strong> admclienteja@gmail.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinhaConta;