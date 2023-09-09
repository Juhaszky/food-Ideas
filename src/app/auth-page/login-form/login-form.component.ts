import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}
  users: string[] = [];
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
  }

  onLogin(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const user = users.find((user: any) => user.email === email);
    console.log(user);

    if (!user) {
      alert('Email not found, please register!');
    } else {
      if (user.password === password) {
        localStorage.setItem('loggedIn', 'true');
        alert('You have successfully logged in!')
        this.router.navigate(['']);
      }
    }
    
  }

  onSignUp(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(this.loginForm.value);

    localStorage.setItem('users', JSON.stringify(users));
    console.log(this.loginForm.value);
  }
}
