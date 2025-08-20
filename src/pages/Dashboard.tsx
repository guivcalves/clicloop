import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardTopbar } from '@/components/dashboard/DashboardTopbar';
import { SidebarProvider } from '@/components/ui/sidebar';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background dashboard-container">
        {/* Sidebar com z-index baixo */}
        <div className="dashboard-sidebar sidebar-fix">
          <DashboardSidebar />
        </div>
        
        {/* Conteúdo principal com z-index mais alto */}
        <div className="flex-1 flex flex-col content-fix">
          <div className="dashboard-topbar topbar-fix">
            <DashboardTopbar />
          </div>
          <main className="flex-1 dashboard-content">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;