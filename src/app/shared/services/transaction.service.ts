import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = 'http://localhost:3000/api/v1/transactions/';
  constructor(private http: HttpClient) { }

  saveTransactions(userEmail: string, transactions: Transaction[]): Observable<any> {
    return this.http.post(this.baseUrl + userEmail, transactions);
  }

  getAllTransactions(userEmail: string): Observable<any> {
    return this.http.get(this.baseUrl + userEmail);
  }
}
