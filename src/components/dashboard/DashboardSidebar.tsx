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
  Sparkles,
  Layout
} from 'lucide-react';

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Layout,
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

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

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

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-brand-primary" />
            {!collapsed && (
              <h1 className="text-xl font-bold text-brand-primary">Cliente Já</h1>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Ferramentas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive: navIsActive }) => 
                        getNavClass(navIsActive || isActive(item.url))
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}