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
2. In `http-mock-request.interceptor.ts`, in the `interpret()` method, you will find handling for each of the API base routes. Comment out any if-blocks for APIs you want to use an actual back-end service for. Note that you cannot use the `mockLogin` method against an actual HTTP call since it needs a real JWT token.

3. If a new service is added, add a new if-block in `intercept()` to handle the corresponding API. If your service inherits `BaseCrudService`, the other mocked methods (`mockPost`, `mockPut`, `mockDelete`) can be used as templates for implementing your own. 