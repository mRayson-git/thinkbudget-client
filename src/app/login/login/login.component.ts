import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: string[] = [];
  constructor(private fb: FormBuilder, private user: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.get('email').value && this.loginForm.get('password').value) {
      this.user.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('thinkbudget-token', res.token);
          this.router.navigate(['/dashboard']);
        },
        err => console.log(err.error)
      );
    }
  }
}
