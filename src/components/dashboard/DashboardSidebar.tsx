import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  FileText, 
  Brain, 
  BarChart3, 
  MessageCircle, 
  HelpCircle, 
  Lightbulb,
  Home,
  Layout,
  Triangle
} from 'lucide-react';
import { useEffect } from 'react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

// ============================================================================
// DATA
// ============================================================================

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Criador de Conteúdo",
    url: "/dashboard/conteudo",
    icon: FileText,
  },
  {
    title: "Construtor de Prompts",
    url: "/dashboard/prompts",
    icon: Brain,
  },
  {
    title: "Analisador de Campanhas",
    url: "/dashboard/analise",
    icon: BarChart3,
  },
  {
    title: "Chat com IA",
    url: "/dashboard/chat",
    icon: MessageCircle,
  },
  {
    title: "Suporte",
    url: "/dashboard/suporte",
    icon: HelpCircle,
  },
  {
    title: "Sugestões",
    url: "/dashboard/sugestoes",
    icon: Lightbulb,
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard';
    }
    return currentPath === path;
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Atualizar CSS custom property para o estado da sidebar com transição suave
  useEffect(() => {
    const sidebarWidth = collapsed ? '64px' : '256px';
    document.documentElement.style.setProperty('--sidebar-width', sidebarWidth);
    
    // Adicionar classe para transição suave
    document.documentElement.classList.add('sidebar-transitioning');
    
    // Remover classe após transição
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('sidebar-transitioning');
    }, 300);
    
    return () => clearTimeout(timer);
  }, [collapsed]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <Sidebar 
      className={`${collapsed ? "w-16" : "w-64"} h-screen border-r-0 sidebar-fix flex-shrink-0`} 
      collapsible="icon"
      style={{ 
        background: 'linear-gradient(180deg, #6366F1 0%, #9333EA 100%)',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 10,
        height: '100vh',
        minHeight: '100vh',
        width: collapsed ? '64px' : '256px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translateZ(0)', // Força aceleração de hardware
        willChange: 'width' // Otimiza performance da animação
      }}
    >
      <SidebarContent 
        className="text-white sidebar-fix h-full flex flex-col"
        style={{ 
          background: 'linear-gradient(180deg, #6366F1 0%, #9333EA 100%)',
          position: 'relative',
          zIndex: 10,
          height: '100%',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        
        {/* ========================================================================
            LOGO/BRAND SECTION
        ========================================================================= */}
        <div className="p-4 border-b border-white/20 flex-shrink-0 transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-3 justify-center">
            {!collapsed && (
              <h1 className="text-lg font-semibold text-white transition-all duration-300 ease-in-out overflow-hidden">
                ClicLoop
              </h1>
            )}
          </div>
        </div>

        {/* ========================================================================
            NAVIGATION MENU - TODOS OS ITENS SEMPRE VISÍVEIS
        ========================================================================= */}
        <div className="flex-1 px-3 py-4 transition-all duration-300 ease-in-out">
          <SidebarMenu className="space-y-1">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="hover:bg-white/10 w-full justify-start transition-all duration-200 ease-in-out">
                  <NavLink 
                    to={item.url} 
                    className={({ isActive: navIsActive }) => {
                      const active = navIsActive || isActive(item.url);
                      return `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out w-full ${
                        active 
                          ? "bg-white/20 text-white shadow-lg" 
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`;
                    }}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0 transition-all duration-200 ease-in-out" />
                    
                    {!collapsed && (
                      <span className="text-sm font-medium text-left transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap">
                        {item.title}
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}