// Configuração de ambiente para diferentes URLs
export const environment = {
  // URLs base para diferentes ambientes
  development: {
    baseUrl: 'http://localhost:8080',
    apiUrl: 'http://localhost:8080',
    supabaseUrl: 'https://egrohrtaazpahdwsvzsu.supabase.co'
  },
  production: {
    baseUrl: 'https://clicloop.com.br',
    apiUrl: 'https://clicloop.com.br',
    supabaseUrl: 'https://egrohrtaazpahdwsvzsu.supabase.co'
  }
};

// Função para obter a configuração atual baseada no ambiente
export const getCurrentEnvironment = () => {
  if (typeof window !== 'undefined') {
    // No navegador, verifica a URL atual
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return environment.development;
    } else if (hostname === 'clicloop.com.br' || hostname.includes('vercel.app')) {
      return environment.production;
    }
  }
  
  // Fallback para desenvolvimento
  return environment.development;
};

// URLs específicas da aplicação
export const getAppUrls = () => {
  const env = getCurrentEnvironment();
  
  return {
    base: env.baseUrl,
    home: `${env.baseUrl}/`,
    login: `${env.baseUrl}/login`,
    register: `${env.baseUrl}/register`,
    dashboard: `${env.baseUrl}/dashboard`,
    minhaConta: `${env.baseUrl}/minha-conta`,
    onboarding: `${env.baseUrl}/onboarding`,
    billing: `${env.baseUrl}/billing`,
    chat: `${env.baseUrl}/dashboard/chat`,
    content: `${env.baseUrl}/dashboard/content`,
    support: `${env.baseUrl}/dashboard/support`,
    suggestions: `${env.baseUrl}/dashboard/suggestions`
  };
};

// Exporta as configurações para uso direto
export const config = {
  ...getCurrentEnvironment(),
  urls: getAppUrls()
};
