export const environment = {
  production: true,
  api: 'http://localhost:8080/api',
  // List of domains that should utilize the user's JWT for API calls
  whitelistedDomains: ['localhost:8080'],
  // List of route(s) that should never use the user's JWT for API calls
  blacklistedRoutes: ['localhost:8080/api/oauth/'],
}
