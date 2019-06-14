# TCP Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Prerequisites

- Docker
- Node LTS

## Development

There are two ways to run the app for local development:

1. Docker Compose
2. Angular CLI

#### Docker Compose

To run the app in a Docker container with live-reloading, run `docker-compose up` from the top-level directory. This will build the app image (using `local.Dockerfile`) and run it in a container (using `docker-compose.yml` as instructions). The app will be accessible via `localhost:4200`.

When finished developing, terminate the running container (`CTRL+C`) and run `docker-compose down` to safely bring down the container & its dependencies.

#### Angular CLI

To run the app using the Angular CLI approach, simply run `npm start`. The app will be accessible via `localhost:4200`.

## Production

There are three npm commands of importance:

#### `npm run docker:build`

This builds the production Docker image (using `prod.Dockerfile`)

#### `npm run docker:run`

This runs the built Docker image (can be accessed via `localhost:3000`)

#### `npm run docker:debug`

This runs the built Docker image, automatically opens the URL, and adds additional logging

## Architecture

The architecture is standard Angular componentized architecture. The structure of the repo is that base components and shared files are located on the base level of app folder. files that are only used by one component (services and other components) are located within that components folder.

## Auth

### Login

The login page allows the user to provide a username and password. The application then sends down that information in an HTTP request. If the api returns a successful response, it will come in the form of a Java Web Token (JWT). The JWT will then be stored locally (currently in localStorage)

### Java Web Token

A Java Web Token is an json object that has been encoded as a string. The JWT for our application takes the following form:

```
{
"iat": 1560354819921,
"exp": 1591984329089,
"email": "jon.doe@gmail.com",
"role": "admin"
}
```

In addition to the shown fields there is also another filed that stores a string that is used by the backend to authenticate that the user. This information is sent in the header of each api request using the auth0/angular-jwt library. The auth0/angular-jwt library is also used to decode the JWT and allow the frontend to access the properties included such as "role".

### authGuard

An authGuard is used to prevent users from navigating to screens that they are not allowed to see. This gaurd will check to see if the user is logged in, and if not it will always redirect them to the login page. Additionally, the authGuard can be given a roles property which will in turn check the role from the JWT object and only allow users to proceed if they are one of the accepted roles. Otherwise it will redirect them to the home page.

## Forms

Form Components extend the BaseForm class, which provides a basic pattern for consuming refs to child component forms, and for child forms to broadcast their form references to parents.

- `formGroup` is a ref to the core, top-level `FormGroup` in the component.
- `formReady` is an `Output` property that emits the `formGroup` (or some other `AbstractControl`) to be caught by the parent component.
- `destroyForm` is an `Output` property that should emit when the componet is destroyed.

Several functions exist to help parents catch and dispose of child `FormGroup`s as those components are spawned/despawned:

- `registerForm()` is the default function for catching a child's `FormGroup` when it is emitted
- `deregisterForm()` clears the reference when a child component is destroyed (the child should emit on `destroyForm` in `ngOnDestroy`)

Lastly, an abstract method must be implemented by any implementing class:

- `buildForm` is responsible for building the baseline, empty `FormGroup` that will be used by the form.

### Best Practices

- `formGroup` should be created/assigned (by calling `buildForm`) in the constructor so the form controls are available when Angular binds the template to the class (which happens before `OnInit`)
- If the form should support editing, respond to a change in an `@Input` property in `ngOnChanges` using the `hasChanged()` helper function, and use `patchValue` to update the form with the new value
- Use [Angular Material Form Components](https://material.angular.io/components/categories/forms) whenever possible
- Utilize the `RequiredMessagePipe` for required messages when form fields are required. This supports a universal required message that's easy to update everywhere at once.

## Routing

Base routing is handled through the app-routing.module.ts file. Sub routes such as the employee module will have their own .module.ts file for further routing. The admin module and employees module are both lazy loaded. The routing file is where the authGuards are added into the application.

## Testing

- `npm run test` is the console command to run the tests

- 85% is the agreed upon tcp minimal test coverage ammount

- More information to be put here as the test framework is ironed out

## Style

[Angular Material](https://material.angular.io/) (@angular/material) is the library used for style and component library that we are using. This brings in googles material design, a color theme as defined in theme.scss, and a rich component library. To add more angular material components to the application, import them in the material.module.ts file. Material components come with built in 508 compliance. [Angular Flex Layout](https://github.com/angular/flex-layout/wiki) (@angular/flex-layout) is the library us used for positioning components in the application.
