import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { UserService } from 'src/app/modules/login/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  alert: string;
  constructor(private fb: FormBuilder, private user: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    if (this.loginForm.get('email').value && this.loginForm.get('password').value) {
      this.user.login(this.loginForm.get('email').value.toLowerCase(), this.loginForm.get('password').value)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('thinkbudget-token', res.token);
          localStorage.setItem('thinkbudget-user', JSON.stringify(res.user));
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.loginForm.reset();
          this.alert = err.error;
          setTimeout(() => {
            this.alert = null;
          }, 3000);
        }
      );
    }
  }
  isFieldValid(fieldName: string): boolean {
    return (this.loginForm.get(fieldName).touched || this.loginForm.get(fieldName).dirty) && this.loginForm.get(fieldName).valid;
  }
  isFieldInvalid(fieldName: string): boolean {
    return (this.loginForm.get(fieldName).touched || this.loginForm.get(fieldName).dirty) && !this.loginForm.get(fieldName).valid;
  }
}
