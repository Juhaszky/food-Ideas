import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}
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
    const users = this.localStorageService.getUsers();
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const user = users.find((user: any) => user.email === email);
    if (!user) {
      alert('Email not found, please register!');
    } else {
      if (user.password === password) {
        localStorage.setItem('loggedIn', 'true');
        alert('You have successfully logged in!');
        this.router.navigate(['']);
      }
    }
  }

  onSignUp(): void {
    const users = this.localStorageService.getUsers();
    const user: User = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };
    users.push(user);
    this.localStorageService.setUsers(users);
    this.localStorageService.saveCurrentUser(user);
  }
}
