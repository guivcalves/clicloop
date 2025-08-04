import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, CreditCard, LogOut, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function DashboardTopbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/');
  };

  const handleManageSubscription = () => {
    navigate('/billing');
  };

  const handleCancelSubscription = () => {
    // Simular redirecionamento para portal do cliente (integração Stripe futura)
    toast({
      title: "Redirecionando...",
      description: "Você será redirecionado para gerenciar sua assinatura.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <SidebarTrigger />
        
        <div className="flex items-center gap-2 ml-4">
          <Sparkles className="h-6 w-6 text-brand-primary" />
          <span className="font-bold text-brand-primary">Cliente Já</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="h-8 w-8 rounded-full bg-brand-primary text-white flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleManageSubscription}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Gerenciar assinatura</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCancelSubscription}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Cancelar assinatura</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}