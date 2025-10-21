# COMMENTS.md

## 🧱 Decisão da Arquitetura Utilizada

### **Back-End**

O projeto foi desenvolvido com foco na **arquitetura de domínio**, garantindo uma separação clara de responsabilidades e modularidade da aplicação.  
A estrutura foi organizada em camadas específicas para cada contexto:

- **common/** → Contém elementos compartilhados entre os módulos, como configurações, conexão com o banco de dados, middlewares e utilitários gerais.  
- **user/** → Responsável pela lógica relacionada a usuários, incluindo entidades, repositórios, serviços e controladores.  
- **student/** → Módulo dedicado ao gerenciamento de estudantes, com suas próprias entidades e regras de negócio.  

Essa abordagem favorece **baixa acoplabilidade**, **alta coesão** e **facilidade de manutenção e escalabilidade**, permitindo evolução independente de cada domínio.

---

### **Front-End**

O front-end foi estruturado com base no **padrão do Vue Router**, garantindo separação entre as **rotas da aplicação** e a **integração com a API**.  
A arquitetura prioriza a **organização por componentes**, **reutilização de código** e **separação de responsabilidades** entre as camadas de interface, lógica e comunicação com o back-end.
 
A comunicação com o back-end é feita através do **Axios**, garantindo integração assíncrona e eficiente com a API REST.

---

## 📦 Bibliotecas de Terceiros Utilizadas

### **Back-End**
- **fastify** → Framework criação de APIs REST.  
- **@fastify/cors** → Configuração de CORS para controle de acesso entre origens.  
- **@fastify/swagger** e **@fastify/swagger-ui** → Documentação da API.  
- **bcrypt** → Criptografia de senhas.  
- **jsonwebtoken** → Autenticação baseada em tokens JWT.  
- **dotenv** → Gerenciamento de variáveis de ambiente.  
- **pg** → Driver PostgreSQL.  
- **reflect-metadata** → Suporte a decorators TypeScript.  
- **typeorm** → ORM para abstração do acesso ao banco de dados.  

#### *Dependências de Desenvolvimento*
- **typescript**, **tsx**, **vitest**, **pino-pretty**, e pacotes **@types/** para tipagem e testes.

---

### **Front-End**
- **vue** → Framework para construção de interfaces reativas.  
- **vue-router** → Controle de rotas e navegação SPA.  
- **vuetify** → Biblioteca de componentes com Material Design.  
- **axios** → Cliente HTTP para integração com o back-end.  
- **vue3-toastify** → Exibição de notificações e mensagens de feedback ao usuário.  
- **@mdi/font** e **@fontsource/roboto** → Ícones e fontes padrão do Material Design.  

#### *Dependências de Desenvolvimento*
- **vite** → Build tool rápida e moderna.  
- **@vitejs/plugin-vue**, **vite-plugin-vuetify**, **unplugin-vue-components**, **unplugin-vue-router** → Integrações otimizadas para build e carregamento dinâmico.  
- **eslint**, **eslint-config-vuetify** → Padronização e linting do código.  
- **vue-tsc** → Verificação de tipos em arquivos `.vue`.  
- **typescript**, **sass-embedded** → Suporte à tipagem estática e estilos avançados.  

---

## 🚀 Melhorias Futuras (Se Houver Mais Tempo)

### **Back-End**
1. **Expansão de funcionalidades:**
   - Cadastro e gerenciamento de cursos.  
   - Associação de estudantes a cursos.  
   - Controle de status de matrícula.  
   - Emissão de relatórios administrativos.  
2. **Infraestrutura:**
   - **Dockerização da aplicação** para padronizar ambientes de desenvolvimento e deploy.  
3. **Qualidade e Testes:**
   - Ampliação da cobertura de testes unitários e criação de **testes E2E (end-to-end)**.  

### **Front-End**
1. **Escalabilidade e Design:**
   - Melhorar o **layout e design** para uma interface mais moderna e responsiva.  
   - Adotar um padrão de **design system** mais consistente entre componentes.  
2. **Qualidade e Testes:**
   - Implementar **testes unitários e de integração** para validar componentes e fluxos principais.  

---

## ✅ Requisitos Obrigatórios

- **Back-End:** Todos os requisitos obrigatórios foram entregues integralmente.  
- **Front-End:** O único requisito pendente foi a **implementação de testes unitários**.
