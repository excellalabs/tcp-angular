// Base domain for the API
const domain = 'localhost:8080'

export const environment = {
  // Whether or not this is a production environment
  production: true,
  // Base URL for all API calls
  api: `http://${domain}/api`,
  // List of domains that should utilize the user's JWT for API calls
  whitelistedDomains: [domain],
  // List of route(s) that should never use the user's JWT for API calls
  blacklistedRoutes: [`${domain}/api/oauth/`],
}
