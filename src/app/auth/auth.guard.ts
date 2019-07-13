import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router'

import { AuthService } from '../services/auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      if (
        route.data.roles &&
        !this.authService.getRoles().includes(route.data.role)
      ) {
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
