import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { AuthService } from '../services/auth/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const updatedRequest = request.clone({
      setHeaders: {
        AuthenticationToken: this.authService.getToken(),
      },
    })
    return next.handle(updatedRequest)
  }
}
