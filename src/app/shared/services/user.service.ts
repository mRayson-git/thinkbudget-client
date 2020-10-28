import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'http://localhost:3000/api/v1/users/';
  constructor(private http: HttpClient) { }

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
  }
}
