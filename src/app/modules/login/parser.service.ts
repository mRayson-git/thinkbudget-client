import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ParserProfile } from '../shared/models/parserProfile';
@Injectable({
  providedIn: 'root'
})
export class ParserService {
  baseUrl = 'http://localhost:3000/api/v1/parser-profiles/';

  constructor(private http: HttpClient) { }

  saveProfile(parserProfile: ParserProfile): Observable<any> {
    return this.http.post(this.baseUrl, parserProfile);
  }

  getProfiles(userEmail: string): Observable<ParserProfile[]> {
    console.log('Getting profiles for: ' + userEmail);
    return this.http.get<ParserProfile[]>(this.baseUrl + userEmail);
  }
}
