import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AuthService } from '../services/auth/auth.service'

@Component({
  selector: 'tcp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  submit() {
    this.authService.login(
      this.formGroup.get('username').value,
      this.formGroup.get('password').value
    )
  }
}
