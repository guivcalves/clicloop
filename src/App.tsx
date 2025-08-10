import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import DashboardOverview from "./pages/dashboard/Overview";
import DashboardContent from "./pages/dashboard/Content";
import DashboardPrompts from "./pages/dashboard/Prompts";
import DashboardAnalysis from "./pages/dashboard/Analysis";
import DashboardChat from "./pages/dashboard/Chat";
import DashboardSupport from "./pages/dashboard/Support";
import DashboardSuggestions from "./pages/dashboard/Suggestions";
import Billing from "./pages/Billing";
import MinhaConta from "./pages/MinhaConta";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardOverview />} />
              <Route path="conteudo" element={<DashboardContent />} />
              <Route path="prompts" element={<DashboardPrompts />} />
              <Route path="analise" element={<DashboardAnalysis />} />
              <Route path="chat" element={<DashboardChat />} />
              <Route path="suporte" element={<DashboardSupport />} />
              <Route path="sugestoes" element={<DashboardSuggestions />} />
            </Route>
            <Route path="/billing" element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            } />
            <Route path="/minha-conta" element={
              <ProtectedRoute>
                <MinhaConta />
              </ProtectedRoute>
            } />
            <Route path="/403" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;