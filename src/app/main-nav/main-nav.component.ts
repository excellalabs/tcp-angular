import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { AuthService } from '../services/auth/auth.service'

@Component({
  selector: 'tcp-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }

  logout() {
    this.authService.logout()
  }
}
