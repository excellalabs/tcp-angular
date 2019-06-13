import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router'
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
        route.data.roles.indexOf(this.authService.getRole()) === -1
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
