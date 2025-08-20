# Instruções de Deploy - ClicLoop

## Problema Identificado
A página estava retornando erro 404 porque o roteamento client-side não estava configurado corretamente para a Vercel.

## Soluções Implementadas

### 1. Configuração do Vercel (`vercel.json`)
- Adicionado `rewrites` para redirecionar todas as rotas para `index.html`
- Configurado `routes` para capturar rotas não encontradas
- Mantidas as configurações de segurança

### 2. Arquivo de Redirecionamentos (`public/_redirects`)
- Criado arquivo para garantir que todas as rotas funcionem

### 3. Configuração do Vite (`vite.config.ts`)
- Otimizado build para produção
- Configurado chunks manuais para melhor performance

### 4. Configurações de Ambiente
- Criados arquivos específicos para produção
- URLs configuradas dinamicamente

## Como Fazer o Deploy

### 1. Commit das Alterações
```bash
git add .
git commit -m "Fix: Configuração de roteamento para Vercel"
git push origin main
```

### 2. Verificar na Vercel
- A Vercel fará deploy automático
- Verificar se o build foi bem-sucedido
- Testar as rotas:
  - `https://clicloop.com.br/` (Home)
  - `https://clicloop.com.br/register` (Registro)
  - `https://clicloop.com.br/login` (Login)
  - `https://clicloop.com.br/dashboard` (Dashboard)

### 3. Se o Problema Persistir
- Verificar logs de build na Vercel
- Confirmar se o arquivo `vercel.json` foi aplicado
- Verificar se não há cache do navegador

## URLs de Produção
- **Site principal**: https://clicloop.com.br
- **Página de registro**: https://clicloop.com.br/register
- **Página de login**: https://clicloop.com.br/login
- **Dashboard**: https://clicloop.com.br/dashboard

## Estrutura de Arquivos
```
├── vercel.json          # Configuração principal da Vercel
├── public/_redirects    # Redirecionamentos
├── src/config/          # Configurações de ambiente
│   ├── environment.ts
│   └── production.ts
└── vite.config.ts       # Configuração do Vite
```
