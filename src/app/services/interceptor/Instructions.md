An HTTP interceptor is included in this repository (`src/app/services/interceptor/http-mock-request.interceptor.ts`) that mocks out API requests and enables development without a back-end service running. See Angular's documentation for details about the framework's implementation: https://angular.io/api/common/http/HttpInterceptor

## How to use
1. In `app.module`, uncomment the provider for the interceptor:
```
{
  provide: HTTP_INTERCEPTORS,
  useClass: HttpMockRequestInterceptor,
  multi: true,
}
```
2. In `http-mock-request.interceptor.ts`, in the `interpret()` method, you will find handling for each of the API base routes. Comment out any `if` blocks for APIs you want to use a running back-end service for. Note that you cannot use the `mockLogin` method against an actual HTTP call since it needs a real JWT token.