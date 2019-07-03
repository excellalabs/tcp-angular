# TCP Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Prerequisites

- [Docker](https://www.docker.com/)
- [Node LTS](https://nodejs.org/)

## Development

There are two ways to run the app for local development:

1. Docker Compose
2. Angular CLI

#### Docker Compose

To run the app in a Docker container with live-reloading, run `docker-compose up` from the top-level directory. This will build the app image (using `local.Dockerfile`) and run it in a container (using `docker-compose.yml` as instructions). The app will be accessible via `localhost:4200`.

When finished developing, terminate the running container (`CTRL+C`) and run `docker-compose down` to safely bring down the container & its dependencies.

#### Angular CLI

To run the app using the Angular CLI approach, simply run `npm start`. The app can be accessed via `localhost:4200`.

## Production

There are three npm commands of importance:

- `npm run docker:build` builds the production Docker image (using `prod.Dockerfile`)
- `npm run docker:run` runs the built Docker image (can be accessed via `localhost:3000`)
- `npm run docker:debug` runs the built Docker image, automatically opens the URL, and adds additional logging

## Architecture

#### Application files
The folder architecture is standard Angular componentized architecture. 

The structure of the repo has common shared files and components at the top of the folder tree, and more specialized components nested within folders belonging to those specific scopes and concerns. For instance, files that are only used by one component (services and other components) are located within that component's folder.

#### Application Architecture
The application architecture closely follows the folder architecture.  Common features are bundled into modules (Admin, Employee), and those modules are loaded on-demand.

## Auth

#### Login

The login page allows the user to provide a username and password. The application then sends down that information in an HTTP request. If the API returns a successful response, it will come in the form of a Java Web Token (JWT). The JWT will then be stored locally (currently in localStorage) using a lookup key (the key name is stored in the AuthService)

#### Java Web Token

A [Java Web Token](https://jwt.io/) is an json object that has been encoded as a string. The JWT for our application takes the following form:

```
{
  authorities: string[]
  client_id: string
  exp: number
  jti: string
  scope: string[]
  user_name: string
}
```

- `authorities` lists the roles or permissions the user has in the Angular app
- `client_id` specifies which app is authenticating the user
- `exp` is the expiration date/time of the JWT
- `jti` case sensitive unique identifier of the token, even among different issuers (useful for the API)
- `scope` lists the roles/permissions the JWT supports with regards to the API (read, write, etc)
- `user_name` stores the username of the user that the JWT belongs to

#### AuthGuard

An [AuthGuard](https://angular.io/guide/router#milestone-5-route-guards) is used to prevent users from navigating to screens that they are not allowed to see. This guard will check to see if the user is logged in, and if not it will always redirect them to the login page. Additionally, the authGuard can be given a roles property which will in turn check the role from the JWT object and only allow users to proceed if they are one of the accepted roles. Otherwise it will redirect them to the home page.

## Forms

[Angular Reactive Forms](https://angular.io/guide/reactive-forms) provide a fantastic platform for responding to user input asynchronously.  However, the system does not have great support for parent/child relationships within forms or forms split across multiple components.  This make large or multi-stage forms cumbersome.

This app has a buit-in pattern to overcome this issue.  Form Components extend the `BaseForm` class, which provides a basic pattern for sharing references between sibling components, or for child forms to broadcast their form references to parents:

- `formGroup` is a ref to the core, top-level `FormGroup` in the component.
- `formReady` is an `Output` property that emits the `formGroup` (or some other `AbstractControl`) to be caught by the parent component.
- `destroyForm` is an `Output` property that should emit when the component is destroyed (must be called by the implementor in `ngOnDestroy()`).

Several helper functions exist to help parents catch and dispose of any child `FormGroup` as those components are spawned/despawned:

- `registerForm()` is the default function for catching a child's `FormGroup` when it is emitted, and supports attaching that `FormGroup` reference to the receiver's `FormGroup` instance
- `deregisterForm()` clears the reference when a child component is destroyed (the child should emit on `destroyForm` in `ngOnDestroy`)

Lastly, an abstract method must be implemented by any implementing class:

- `buildForm` is responsible for building the baseline, empty `FormGroup` that will be used by the form.

#### BaseForm implementation notes

- `formGroup` should be created/assigned (by calling `buildForm`) in the constructor so the form controls are available when Angular binds the template to the class (which happens before `OnInit`)
- If the form should support editing, respond to a change in an `@Input` property in `ngOnChanges` using the `hasChanged()` helper function, and use `patchValue` to update the form with the new value
- Use [Angular Material Form Components](https://material.angular.io/components/categories/forms) whenever possible
- Utilize the `RequiredMessagePipe` for required messages when form fields are required. This supports a universal required message that's easy to update everywhere at once.

## CRUD Services

Most CRUD operations are identical, except for the API endpoint and format of the data being managed. Leveraging this fact, there is a `BaseCrudService` that can be utilized to quickly build an [Angular Service](https://angular.io/tutorial/toh-pt4) that supports CRUD to a given endpoint that serves data aligned with a given object or interface.

**Implementation examples exist in the `services` folder**, and must declare their data format in the extension of the `BaseCrudService` at the class level.  Additionally, they should implement an `endpoint` string that references the unique portion of the API url for that endpoint.

This effectively reduces basic CRUD services to a handful of lines of code, once an API contract has been established using [typescript interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) or javascript classes.

#### Route Resolvers

In many cases, it is desirable for lists of data to be ready before the comonents are rendered for the first time; whether these lists are the contents of a select input, a data table or reference for some business operation.

Any service that extends the `BaseCrudService` can also be wired into a route as its own route resolver.

## Routing

Base routing is handled through the `app-routing.module.ts` file. 

Sub-routes such as the employee module will have their own `routing.module.ts` file for further routing within that sub-module. The `admin` module and `employees` module are both lazy loaded, which means they are not downloaded to the user's browser until they are requested.  This drastically reduces the initial payload to the user, resulting in a very fast initial rendering of the application. 

The routing file is where the AuthGuards, Interceptors and other routing functions are added into the application.

## Style

[Angular Material](https://material.angular.io/) (@angular/material) is the component and style library used.

This brings in Google's [Material Design](https://material.io/design/) styling, plentiful web accessability features and built-in animations. A color theme already compliant with [USWDS](https://designsystem.digital.gov/) is defined in `theme.scss`.

To add more [Angular Material](https://material.angular.io/components/categories) components to the application, import them in the `material.module.ts` file. Material components come with built in 508 compliance, so long as `aria` inputs are provided when they are used. 

## Layout

[Angular Flex Layout](https://github.com/angular/flex-layout/wiki) (@angular/flex-layout) is the library us used for positioning components in the application.

## Messaging

The application makes use of Angular Material's [SnackBar](https://material.angular.io/components/snack-bar/overview) for simple operation confirmation messages, and [MatDialog](https://material.angular.io/components/dialog/overview) for larger, more important (and interactable) confirmation dialogs.

## Testing

85% is the agreed upon TCP minimal test coverage ammount

Some useful testing commands:
- `npm run test` To run the automated unit/integration tests.  A browser window will pop up and the tests will be displayed as they run.
- `npm run test:headless` To run the tests without the pop-up and have a nice result summary in the console.  This is a useful setup for devs writing tests
- `npm run test:coverage` To run code-coverage.  Coverage details can be found by opening `coverage/tcp-angular/index.html` in a browser.
- `npm run e2e` To run the End-to-End (E2E) tests.  NOTE: The application must already be up and running for these tests to work.  


