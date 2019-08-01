import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router'

import { Role } from '../models/role';
import { AuthService } from '../services/auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.handleCheck(route.data.roles);
  }

  handleCheck(rolesAllowed: Role[]): boolean {
    if (this.authService.isLoggedIn()) {
      const userRoles = this.authService.getRoles()
      if (rolesAllowed && !rolesAllowed.every(r => userRoles.includes(r))) {
        this.router.navigateByUrl('/home')
        return false
      }
      return true
    } else {
      this.router.navigateByUrl('/login')
      return false
    }
  }
}
