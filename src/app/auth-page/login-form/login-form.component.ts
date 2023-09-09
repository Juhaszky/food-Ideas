import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  hide = true;
  toggle = false;
  isLoginMode = true;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  getErrorMessage(email: AbstractControl) {
    console.log(email);
    /*if (value.email) {
      if (value.email.hasError('required')) {
        return 'You must enter a value';
      }
    }
*
    return this.loginForm.email.hasError('email') ? 'Not a valid email' : '';*/
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    console.log(this.isLoginMode);
  }
}
