# IA Content Creator

Uma aplicação moderna de SaaS com ferramentas de IA para criadores, profissionais e pequenos negócios.

## Tecnologias Utilizadas

Este projeto foi construído com:

- **Vite** - Ferramenta de build rápida
- **TypeScript** - Tipagem estática para JavaScript
- **React** - Biblioteca para interfaces de usuário
- **shadcn-ui** - Componentes de UI modernos
- **Tailwind CSS** - Framework de CSS utilitário
- **Supabase** - Backend como serviço

## Como executar o projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <URL_DO_SEU_REPOSITORIO>

# Navegue até o diretório do projeto
cd sistema

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:8080`.

### URLs de Produção

- **Site principal**: [https://clicloop.com.br](https://clicloop.com.br)
- **Página de login**: [https://clicloop.com.br/login](https://clicloop.com.br/login)
- **Página de registro**: [https://clicloop.com.br/register](https://clicloop.com.br/register)
- **Dashboard**: [https://clicloop.com.br/dashboard](https://clicloop.com.br/dashboard)

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── contexts/       # Contextos do React
├── hooks/          # Hooks customizados
├── integrations/   # Integrações com serviços externos
├── lib/            # Utilitários e configurações
└── pages/          # Páginas da aplicação
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request