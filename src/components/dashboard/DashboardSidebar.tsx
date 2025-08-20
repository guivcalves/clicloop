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

  const getNavClass = (isActive: boolean) =>
    isActive 
      ? "bg-brand-primary text-white hover:bg-brand-primary/90" 
      : "hover:bg-muted/50";

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <Sidebar 
      className={`${collapsed ? "w-16" : "w-60"} border-r-0 sidebar-fix`} 
      collapsible="icon"
      style={{ 
        background: 'linear-gradient(180deg, #6366F1 0%, #9333EA 100%)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <SidebarContent 
        className="text-white sidebar-fix"
        style={{ 
          background: 'linear-gradient(180deg, #6366F1 0%, #9333EA 100%)',
          position: 'relative',
          zIndex: 10
        }}
      >
        
        {/* ========================================================================
            LOGO/BRAND SECTION
        ========================================================================= */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            {!collapsed && (
              <h1 className="text-lg font-semibold text-white">
                ClicLoop
              </h1>
            )}
          </div>
        </div>

        {/* ========================================================================
            NAVIGATION MENU
        ========================================================================= */}
        <div className="px-3 py-6">
          <SidebarMenu className="space-y-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="hover:bg-white/10">
                  <NavLink 
                    to={item.url} 
                    className={({ isActive: navIsActive }) => {
                      const active = navIsActive || isActive(item.url);
                      return `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                        active 
                          ? "bg-white/20 text-white shadow-lg" 
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`;
                    }}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    
                    {!collapsed && (
                      <span className="text-sm font-medium">
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