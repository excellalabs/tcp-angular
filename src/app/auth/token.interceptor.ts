import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth/auth.service'
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const updatedRequest = request.clone({
      setHeaders: {
        AuthenticationToken: this.authService.getToken()
      }
    })
    return next.handle(updatedRequest)
  }
}
