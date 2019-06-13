import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'

import { Role } from '../../models/role'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  key = 'tcp-angular'
  jwtHelper = new JwtHelperService()

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    this.http
      .get('login', {
        headers: new HttpHeaders({ u: username, p: password }),
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

  getToken(decoded: boolean = false) {
    const token = localStorage.getItem(this.key)
    try {
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token)
        if (decodedToken.exp - new Date().getTime() < 0) {
          this.logout()
          return
        }
      }
      if (decoded) {
        return this.jwtHelper.decodeToken(token)
      } else {
        return token
      }
    } catch (err) {
      this.logout()
    }
  }

  getEmail() {
    const token = this.getToken(true)
    return token.email
  }

  getRole() {
    const token = this.getToken(true)
    return token.role
  }

  isLoggedIn() {
    if (this.getToken()) {
      return true
    }
    return false
  }

  isAdmin() {
    return this.getRole() === Role.admin
  }
}
