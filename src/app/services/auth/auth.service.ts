import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  key = 'tcp-angular'
  jwtHelper = new JwtHelperService()

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    this.http
      .get('login', {
        headers: new HttpHeaders({ u: username, p: password })
      })
      .subscribe(
        (data: string) => {
          localStorage.setItem(this.key, data)
          this.router.navigateByUrl('')
        },
        (err: HttpErrorResponse) => {
          alert(err.error)
        }
      )
  }

  logout() {
    localStorage.removeItem(this.key)
    this.router.navigateByUrl('login')
  }

  isLoggedIn() {
    if (this.getToken()) {
      return true
    }
    return false
  }

  getToken() {
    const token = localStorage.getItem(this.key)
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token)
      if (decodedToken.exp - new Date().getTime() < 0) {
        this.logout()
        return
      }
    }
    return token
  }
}
