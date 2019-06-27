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
    if (request.url.includes('oauth')) {
      return next.handle(request)
    }

    const headersWithToken = request.headers.append(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    )
    const updatedRequest = request.clone({ headers: headersWithToken })
    return next.handle(updatedRequest)
  }
}
