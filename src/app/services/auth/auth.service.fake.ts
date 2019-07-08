import { Injectable } from '@angular/core'

import { Role } from '../../models/role'
import { AuthService, IAuthService } from './auth.service'

@Injectable()
export class MockAuthService extends AuthService implements IAuthService {
  constructor() {
    super(null, null)
  }

  login(username: string, password: string) {}

  logout() {}

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
