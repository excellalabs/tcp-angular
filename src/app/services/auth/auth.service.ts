import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'
import { of } from 'rxjs'

import { environment } from '../../../environments/environment'
import { Role } from '../../models/role'
import { dummyEmployees } from '../employees/employees.service.fake'

export interface IAuthService {
  login(username: string, password: string): void
  logout(): void
  getToken(decoded: boolean)
  getEmail(): string
  getRole(): string
  isLoggedIn(): boolean
  isAdmin(): boolean
}

export interface IAuthContents {
  access_token: string
  expires_in: number
  jti: string
  refresh_token: string
  scope: string
  token_type: string
}

export interface IJwtContents {
  authorities: string[]
  client_id: string
  exp: number
  jti: string
  scope: string[]
  user_name: string
}

@Injectable()
export class AuthService implements IAuthService {
  static key = 'tcp-angular'
  jwtHelper = new JwtHelperService()

  tokenEndpoint: '/oauth/token'
  authorizationEndpoint: '/oauth/authorization'

  constructor(private http: HttpClient, private router: Router) {}

  login(userName: string, userPass: string) {
    const url = `${environment.api}/oauth/token`

    const payload = new HttpParams()
      .append('grant_type', 'password')
      .append('username', userName)
      .append('password', userPass)
      .append('scope', 'read write')

    const authHeaders = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append(
        'Authorization',
        'Basic ' +
          btoa('app:$2a$04$hqawBldLsWkFJ5CVsvtL7ed1z9yeoknfuszPOEHWzxfLBoViK6OVi')
      )
      .append('Accept', '*/*')

    this.http.post(url, payload, { headers: authHeaders }).subscribe(
      (data: IAuthContents) => {
        localStorage.setItem(AuthService.key, data.access_token)
        this.router.navigateByUrl('home')
      },
      (err: HttpErrorResponse) => {
        console.log(err)
      }
    )
  }

  logout() {
    localStorage.removeItem(AuthService.key)
    this.router.navigateByUrl('login')
  }

  getToken(decoded: boolean = false) {
    const token = localStorage.getItem(AuthService.key)
    try {
      if (token) {
        const decodedToken: IJwtContents = this.jwtHelper.decodeToken(token)
        const tokenLifeLeft = decodedToken.exp - new Date().getTime() / 1000
        if (tokenLifeLeft < 0) {
          console.log('logging out')
          this.logout()
          return null
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

  getEmail(): string {
    const token = this.getToken(true)
    // return token.email
    return 'john@winchester.com'
  }

  getRole(): string {
    const token = this.getToken(true)
    return token.role
  }

  isLoggedIn(): boolean {
    if (this.getToken()) {
      return true
    }
    return false
  }

  isAdmin(): boolean {
    return this.getRole() === Role.admin
  }
}
