import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useAuditLog = () => {
  const { user } = useAuth();

  const logAction = async (acao: string, detalhes?: string) => {
    if (!user?.id) return;

    try {
      await supabase.from('logs_auditoria').insert({
        user_id: user.id,
        acao,
        detalhes
      });
    } catch (error) {
      console.error('Erro ao registrar log de auditoria:', error);
    }
  };

  return { logAction };
};