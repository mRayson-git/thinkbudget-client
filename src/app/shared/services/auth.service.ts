import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUrl = 'http://localhost:3000/api/v1/users/';
  constructor(private http: HttpClient) { }

  loggedIn(): boolean {
    return !!localStorage.getItem('thinkbudget-token');
  }

}
