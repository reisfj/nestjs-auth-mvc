# NestJS Auth MVC

## Description
The "nestjs-auth-mvc" project is an authentication system developed with NestJS, written with TypeScript with a structure focused on Object Orientation with the MVC architecture and using authentication resources such as JWT. It includes features such as user registration, login and password recovery, with specific pages for each one. The project is configured to run with MongoDB and provides an API with REST endpoints to manage authentication and user listing. The structure is focused on the clear and secure management of tokens and users.

This application utilizes a variety of technologies, including:

- **NestJS 10.0**: A framework for building efficient and scalable server-side applications with Node.js, leveraging decorators and modular architecture.
- **Axios**: A promise-based HTTP client used for making API requests.
- **JWT (JSON Web Token)**: Used for secure authentication through the @nestjs/jwt package, allowing for token-based user verification.
- **MongoDB**: NoSQL database, managed through the @nestjs/mongoose package for seamless integration with NestJS.
- **TypeORM 0.3**: An ORM that provides a way to interact with relational databases, like MySQL or PostgreSQL, via object-oriented principles.
- **Passport**: An authentication middleware for Node.js, with strategies for JWT and local authentication.
- **Bcrypt**: Library used for hashing passwords, enhancing security in the authentication process.
- **Handlebars**: Templating engine used to render dynamic views in the application.
- **Nodemailer**: A library for handling email sending, useful for user notifications and account verifications.
- **TypeScript**: Strongly typed superset of JavaScript that improves maintainability and scalability.
- **Jest**: A testing framework used for unit and integration testing to ensure code reliability.
- **ESLint and Prettier**: Tools for maintaining code quality and consistent formatting across the application.

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
