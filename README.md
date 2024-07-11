# BookStore App Using NestJS

### MVP Demo

[![MVP demo](https://img.youtube.com/vi/6RwOg5j3A5M/0.jpg)](https://youtu.be/6RwOg5j3A5M)

## How to run the project

### Requirements

- NodeJS: starting from version v20.13.1 (recommended latest)
- NPM package manager: starting from version 10.5.2 (recommended latest)
- Running PostgreSQL Server: starting from version 16.2 (recommended latest)

### Getting Started 🚀

- Clone the repo
- Create empty PostgreSQL database
- Copy `.env.example` into a `.env` file and fill its own values
- `cd` into the project
- Run `npm install -D` to install the dependencies
- Run `npm run build` to build
- Run `npm run migration:run` to migrate typeorm migrations src/app/database/
- Run `npm run start:dev` to run your dev server

## Infra-structure ("/src" dir)

### Module Structure (Modules Default)

- controllers/ (Route Handling)
- dto/ (Data Transfer Object)
- repository/ (DB logic)
- service/ (Business Logic)

### Available Modules

#### - AppModule (Global Mediator Module) "/src/app"

contains globally used things like:

- database/ table migrations
- decorators/ (custom decorators)
- exception-filter/ (http.exception-filter.ts => unify error, exception shape)
- interceptor/ (http-response.interceptor.ts => unify response shape)
- guard/ (auth.guard.ts => handle auth)
- pipe/ (data transform)
- config.ts (export, register diff validated app class based configs)
- app.module.ts (handle dependency injection for diff modules)

you don't need to create `/common/ feature/ shared/ DatabaseModule/ ConfigModule/ ... etc`
this makes it complicated and very nested for example <br>
why implement `ConfigModule`?
NestJS provide you with a built-in one <br>
why you create mediator and you have `AppModule` ?
you should utilize `forRootAsync()` & `registerAsync()` methods

#### - AuthModule (Persona Module) "/src/auth"

- Persona data like user, (admin can be added)
- Authentication, Authorization

#### - BookStoreModule "/src/book-store" (Feature Module)

- Book
- Author
- Genre

## How Modules Communicate?

- Modules Communicate to each others using `AppModule (Mediator)`
- example:<br>
    `BookStoreModule > BooksController` uses `AppModule > AuthGuard`
    and if you check `BookStoreModule` it doesn't know about `AuthModule`
    this makes ability to later on change the code inside `AuthGuard`
    to utilize External Auth Service like `Keycloak` easily

<img src="https://github.com/abdallah-zaghloul/book-store/assets/61375797/920df004-5689-4f2a-8e23-947b16db3082">
<img src="https://github.com/abdallah-zaghloul/book-store/assets/61375797/aaafd2ab-a15b-4f9f-bee6-33ef12d8b174">

## Response Shape

you can change default status code to `SUCCESS: 200`
at the `src/app/interceptor/http-response.interceptor.ts`

```
{
  status: bool,
  statusCode": number,
  message": string,
  data?: any, //response data
  errors?: [] //validation errors
}
```

available Status/Http codes:

- 200: Success (default)
- 204: No Content
- 400: Bad Request (validation)
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error
