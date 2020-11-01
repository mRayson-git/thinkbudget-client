import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/modules/shared/models/user';
import { UserService } from 'src/app/modules/login/user.service';
import { matchingValidator } from 'src/app/modules/shared/validators/matching.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  alert = '';
  constructor(private fb: FormBuilder, private user: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cpassword: ['', [Validators.required]]
    }, { validators: matchingValidator });
  }

  register(): void {
    const user: User = {
      username: this.registerForm.get('username').value,
      email: this.registerForm.get('email').value.toLowerCase(),
      password: this.registerForm.get('password').value
    };
    this.user.registerUser(user).subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err => {
        this.registerForm.get('email').reset();
        console.log(err);
        this.alert = err.error;
        setTimeout(() => {
          this.alert = null;
        }, 3000);
      }
    );
  }

  isFieldValid(fieldName: string): boolean {
    return (this.registerForm.get(fieldName).touched || this.registerForm.get(fieldName).dirty) && this.registerForm.get(fieldName).valid;
  }
  isFieldInvalid(fieldName: string): boolean {
    return (this.registerForm.get(fieldName).touched || this.registerForm.get(fieldName).dirty) && !this.registerForm.get(fieldName).valid;
  }

}
