# 🚀 Chatbot AI - Frontend

Este repositório contém a interface frontend de um **Chatbot com Inteligência Artificial**, desenvolvido utilizando **Next.js 15**, **TypeScript**, **Tailwind CSS** e **ShadCN UI**. O backend da aplicação foi construído em **Python Flask**, hospedado no AWS Elastic Beanstalk.

## 📌 Tecnologias Utilizadas

- **Next.js 15** → Framework React para renderização otimizada.
- **TypeScript** → Tipagem estática para melhor manutenção do código.
- **Tailwind CSS** → Estilização rápida e responsiva.
- **ShadCN UI** → Componentes estilizados para uma UI moderna.
- **Axios** → Cliente HTTP para comunicação com a API.
- **Flask (Backend)** → API criada em Python para processar as requisições do chatbot.

## 🎯 Objetivo do Projeto

Este projeto tem como objetivo criar uma **interface interativa** para um chatbot baseado em IA. O usuário pode enviar mensagens, e a IA responde dinamicamente, proporcionando uma experiência fluida e intuitiva.

## 🏗 Estrutura do Projeto

```
📁 chatbot-frontend
 ├── 📁 app/                 # Diretório principal do Next.js
 │   ├── 📄 page.tsx         # Página principal do chat
 │   ├── 📁 components/ui/   # Componentes reutilizáveis do ShadCN UI
 ├── 📄 package.json         # Dependências e scripts do projeto
 ├── 📄 tailwind.config.js   # Configuração do Tailwind CSS
 ├── 📄 next.config.js       # Configuração do Next.js
 ├── 📄 tsconfig.json        # Configuração do TypeScript
 └── 📄 README.md            # Documentação do projeto
```

## ⚙️ Instalação e Execução

### 1️⃣ Clone o repositório
```sh
git clone https://github.com/seu-usuario/chatbot-frontend.git
cd chatbot-frontend
```

### 2️⃣ Instale as dependências
```sh
npm install
```

### 3️⃣ Configure a variável de ambiente
Crie um arquivo `.env.local` na raiz do projeto e adicione a URL da API:
```sh
NEXT_PUBLIC_API_URL=https://api-app.us-east-1.elasticbeanstalk.com/chat
```

### 4️⃣ Inicie o servidor de desenvolvimento
```sh
npm run dev
```
Acesse **http://localhost:3000** para ver a aplicação rodando.

## 📬 Contato
Caso tenha dúvidas ou sugestões, entre em contato pelo GitHub ou email. Contribuições são bem-vindas! 🚀

