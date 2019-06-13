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
