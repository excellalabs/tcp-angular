// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// Base domain for the API
// BEGIN DOMAIN DEF  do not modify or move this line or put anything but the domain setting between BEGIN and END
const domain = 'localhost:8080'
// END DOMAIN DEF    do not modify or move this line or put anything but the domain setting between BEGIN and END

export const environment = {
  // Whether or not this is a production environment
  production: false,
  // Base URL for all API calls
  api: `http://${domain}/api`,
  // List of domains that should utilize the user's JWT for API calls
  whitelistedDomains: ['localhost:4200', domain],
  // List of route(s) that should never use the user's JWT for API calls
  blacklistedRoutes: [`${domain}/api/oauth/`],
}
