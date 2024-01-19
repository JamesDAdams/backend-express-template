

<h1 style="text-align: center;">Backend Express Template</h1>

<p>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

<p align="center">
  <a href="https://expressjs.com/fr/">
    <img width="50" height="50" src="https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo.png" alt="express" />
  </a>
  <a href="https://www.prisma.io/">
    <img width="50" height="50" src="https://cdn.icon-icons.com/icons2/2148/PNG/512/prisma_icon_132076.png" alt="prisma" />
  </a>
  <a href="https://swagger.io/">
    <img width="50" height="50" src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_swagger_icon_130134.png" alt="swagger" />
  </a>
  <a href="https://www.postman.com/">
    <img width="50" height="50" src="https://www.svgrepo.com/show/354202/postman-icon.svg" alt="postman" />
  </a>
  <a href="https://www.docker.com/">
    <img width="50" height="50" src="https://static-00.iconduck.com/assets.00/docker-icon-512x438-ga1hb37h.png" alt="docker" />
  </a>
  <a href="https://aws.amazon.com/fr/s3/">
    <img width="50" height="50" src="https://static-00.iconduck.com/assets.00/aws-s3-simple-storage-service-icon-1694x2048-ygs8j98c.png" alt="s3" />
  </a>
    <a href="https://nodemailer.com/">
    <img width="50" height="50" src="https://i0.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png?fit=422%2C360&ssl=1" alt="Nodemailer" />
  </a>
  </a>
    <a href="https://bun.sh/">
    <img width="50" height="50" src="https://www.sagexa.com/img/formation-bun-javascript-sagexa.png" alt="bun" />
  </a>
</p>

Base Express server template with Prisma ORM (v5), routing-controllers, JWT authentication, TypeScript, Swagger, Postman config, Docker, Email, S3, Logging, Bun

## Features

- 🔥 Type checking with [TypeScript](https://www.typescriptlang.org)
- 🗄️ Simply SQL with [Prisma ORM](https://www.prisma.io/)
- 🛣️ Routing controllers with [routing-controllers](https://www.npmjs.com/package/routing-controllers)
- 🪪 Authentication with [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- ⚖️ Authorization and roles with [routing-controllers](https://www.npmjs.com/package/routing-controllers)
- 📧 Send Email with [Nodemailer](https://www.npmjs.com/package/nodemailer)
- 🗃️ Store files in [S3](https://www.npmjs.com/package/@aws-sdk/client-s3)
- 🔎 Show api with [Swagger](https://swagger.io)
- 🖊️ Api test with [Postman](https://www.postman.com)
- 🐋 Deploy with [Docker](https://www.docker.com)
- 📏 Linter with [ESLint](https://eslint.org)
- 💖 Code Formatter with [Prettier](https://prettier.io)
- ❌ Global error handler with [routing-controllers](https://www.npmjs.com/package/routing-controllers)
- 🔡 Environment variables with [Dotenv](https://www.npmjs.com/package/dotenv)
- 🧵 Logging systen with [Pino](https://www.npmjs.com/package/pino)
- ⏩ Fast build, test, install with [Bun](https://bun.sh/)
- ✅ Validations
- 📜 DTO pattern

## Project structure

```
📦/ # Main folder
 ┣ 📂postman # The Postman config to import
 ┣ 📂docker # For launch the server and db in docker container
 ┣ 📦src # Main folder of code
  ┣ 📂controllers # Folder for handlers functions called from routes
  ┣ 📂dtos # DTO pattern for handling data
  ┣ 📂exceptions # Global handle error
  ┣ 📂interfaces # Interfaces for greater abstraction
  ┣ 📂middleware # Folder for express middlewares
  ┣ 📂server # Express server instance with routing-controllers config
  ┣ 📂services # Services for write core code bussiness
  ┣ 📂utils # Utils for usage in the application
  ┗ 📜app.ts # Main file
```

## Install

Install required packages with

```
bun install
```

## Initial configuration

Create an `.env` file and setup the variables

```
cp .env.example .env
```

Migrate with prisma in order to create the required database tables

```
bun prisma:deploy
```

## Development

While editing your code, you probably want to automatically build your application and watch for changes with nodemon, in order to achieve that, just run `bun dev` and `bun dev:watch`

## Postman

You can import `backend-express-template.postman_collection.json` in your postman collections
And `workspace.postman_globals.json` in your Environments

## Docker

You can launch the server and the database in docker with this command (edit variable in the `docker-compose.yml`)

```
cd /docker
docker-compose up -d
```

## Production

Build your application with `bun build` and then run it with `bun start`

## ERROR

If you have this error : `Module '"@prisma/client"' has no exported member 'User'` run `bun prisma generate`

## Licence

MIT
