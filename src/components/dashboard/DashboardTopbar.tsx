import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { User, Settings, CreditCard, LogOut, Search, Bell } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center px-6">
        <SidebarTrigger className="text-gray-600" />

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-4">

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            {user?.name && (
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #6366F1 0%, #9333EA 100%)' }}
                  >
                    <User className="h-5 w-5 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    {user?.name && <p className="text-sm font-medium leading-none">{user.name}</p>}
                    {user?.email && (
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    )}
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
      </div>
    </header>
  );
}