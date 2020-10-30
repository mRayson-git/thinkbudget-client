import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = 'http://localhost:3000/api/v1/transactions/';

  transactions$: Observable<any>;

  constructor(private http: HttpClient) { }

  saveTransactions(userEmail: string, transactions: Transaction[]): void{
    this.http.post(this.baseUrl + userEmail, transactions).subscribe();
    // find better way
    setTimeout(() => {
      this.updateTransactions(userEmail);
    }, 1000);
  }

  updateTransactions(userEmail: string): void {
    console.log('Updating the transaction stream');
    this.transactions$ = this.http.get<Transaction[]>(this.baseUrl + userEmail);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactions$;
  }
}
