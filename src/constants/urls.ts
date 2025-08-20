// URLs principais da aplicação ClicLoop
export const APP_URLS = {
  // URLs de produção
  PRODUCTION: {
    BASE: 'https://clicloop.com.br',
    HOME: 'https://clicloop.com.br/',
    LOGIN: 'https://clicloop.com.br/login',
    REGISTER: 'https://clicloop.com.br/register',
    DASHBOARD: 'https://clicloop.com.br/dashboard',
    MINHA_CONTA: 'https://clicloop.com.br/minha-conta',
    ONBOARDING: 'https://clicloop.com.br/onboarding',
    BILLING: 'https://clicloop.com.br/billing',
    CHAT: 'https://clicloop.com.br/dashboard/chat',
    CONTENT: 'https://clicloop.com.br/dashboard/content',
    SUPPORT: 'https://clicloop.com.br/dashboard/support',
    SUGGESTIONS: 'https://clicloop.com.br/dashboard/suggestions'
  },
  
  // URLs de desenvolvimento
  DEVELOPMENT: {
    BASE: 'http://localhost:8080',
    HOME: 'http://localhost:8080/',
    LOGIN: 'http://localhost:8080/login',
    REGISTER: 'http://localhost:8080/register',
    DASHBOARD: 'http://localhost:8080/dashboard',
    MINHA_CONTA: 'http://localhost:8080/minha-conta',
    ONBOARDING: 'http://localhost:8080/onboarding',
    BILLING: 'http://localhost:8080/billing',
    CHAT: 'http://localhost:8080/dashboard/chat',
    CONTENT: 'http://localhost:8080/dashboard/content',
    SUPPORT: 'http://localhost:8080/dashboard/support',
    SUGGESTIONS: 'http://localhost:8080/dashboard/suggestions'
  }
};

// Função para obter a URL atual baseada no ambiente
export const getCurrentUrl = (path: keyof typeof APP_URLS.PRODUCTION) => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return APP_URLS.DEVELOPMENT[path];
    } else if (hostname === 'clicloop.com.br' || hostname.includes('vercel.app')) {
      return APP_URLS.PRODUCTION[path];
    }
  }
  
  // Fallback para desenvolvimento
  return APP_URLS.DEVELOPMENT[path];
};

// URLs específicas que você solicitou
export const CREATE_ACCOUNT_URL = getCurrentUrl('REGISTER');
export const LOGIN_URL = getCurrentUrl('LOGIN');
export const DASHBOARD_URL = getCurrentUrl('DASHBOARD');
export const HOME_URL = getCurrentUrl('HOME');
