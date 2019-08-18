// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: 'http://localhost:8080/api',
  // List of domains that should utilize the user's JWT for API calls
  whitelistedDomains: ['localhost:4200', 'localhost:8080'],
  // List of route(s) that should never use the user's JWT for API calls
  blacklistedRoutes: ['localhost:8080/api/oauth/'],
}
