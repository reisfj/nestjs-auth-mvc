# NestJS Auth MVC

## Descrição
Projeto MVP utilizando NestJS com autenticação via JWT. Inclui páginas de cadastro, login, recuperação de senha e home.

## Configuração
1. Clone o repositório:
    ```bash
    git clone <repo-url>
    cd nestjs-auth-mvc
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o MongoDB:
    Certifique-se de que o MongoDB está em execução e a conexão está configurada corretamente no `src/app.module.ts`.

4. Inicie o servidor:
    ```bash
    npm run start
    ```

5. Acesse o projeto em `http://localhost:3000`.

## Endpoints
- `POST /api/auth/register` - Registra um novo usuário.
- `POST /api/auth/login` - Autentica um usuário.
- `GET /api/users` - Lista todos os usuários cadastrados.
