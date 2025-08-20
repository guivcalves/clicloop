import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Variáveis de ambiente para o cliente
    __PRODUCTION_URL__: JSON.stringify('https://clicloop.com.br'),
    __DEVELOPMENT_URL__: JSON.stringify('http://localhost:8080'),
    __SUPABASE_URL__: JSON.stringify('https://egrohrtaazpahdwsvzsu.supabase.co'),
  },
}));
