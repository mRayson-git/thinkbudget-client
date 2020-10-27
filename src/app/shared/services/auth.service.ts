import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userUrl = 'http://localhost:3000/api/v1/users/';
  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<Message> {
    return this.http.post<Message>(this.userUrl + 'register', user);
  }
}
