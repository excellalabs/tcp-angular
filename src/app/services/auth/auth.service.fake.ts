import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'

import { Role } from '../../models/role'

export interface IAuthService {
  login(username: string, password: string): void
  logout(): void
  getToken(decoded: boolean)
  getEmail(): string
  getRole(): string
  isLoggedIn(): boolean
  isAdmin(): boolean
}

@Injectable()
export class MockAuthService implements IAuthService {
  key = 'tcp-angular'
  jwtHelper = new JwtHelperService()

  constructor(private router: Router) {}

  login(username: string, password: string) {  }

  logout() {
    this.router.navigateByUrl('login')
  }

  getToken(decoded: boolean = false) {
    if (decoded) {
      return {
        email: 'jon.doe@gmail.com',
        role: Role.admin,
      }
    } else {
      return {}
    }
  }

  getEmail(): string {
    const token = this.getToken(true)
    return token.email
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
