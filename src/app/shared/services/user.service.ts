import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Message } from '../models/message';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'http://localhost:3000/api/v1/users/';
  constructor(private http: HttpClient, private router: Router) { }

  // Register a user with the backend
  registerUser(user: User): Observable<any> {
    return this.http.post<any>(this.userUrl + 'register', user);
  }

  // Validate and log in a user
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.userUrl + 'login', { email, password });
  }

  // logout
  logout(): void {
    localStorage.removeItem('thinkbudget-token');
    this.router.navigate(['/login']);
  }

  // get all users
  getUsers(): Observable<any> {
    return this.http.get(this.userUrl);
  }
}
