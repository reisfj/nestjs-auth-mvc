# NestJS Auth MVC

## Description
The "nestjs-auth-mvc" project is an authentication system developed with NestJS, written with TypeScript with a structure focused on Object Orientation with the MVC architecture and using authentication resources such as JWT. It includes features such as user registration, login and password recovery, with specific pages for each one. The project is configured to run with MongoDB and provides an API with REST endpoints to manage authentication and user listing. The structure is focused on the clear and secure management of tokens and users.

## Configuration
1. Clone the repository:
```bash
git clone <repo-url>
cd nestjs-auth-mvc
```

2. Install the dependencies:
```bash
npm install
```

3. Configure MongoDB:

Make sure MongoDB is running and the connection is configured correctly in `src/app.module.ts`.

4. Start the server:
```bash
npm run start
```

5. Access the project at `http://localhost:3000`.

## Endpoints
- `POST /api/auth/register` - Registers a new user.
- `POST /api/auth/login` - Authenticates a user.
- `GET /api/users` - Lists all registered users.
