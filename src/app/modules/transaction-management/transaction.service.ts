import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Transaction } from 'src/app/modules/shared/models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = 'http://localhost:3000/api/v1/transactions/';
  initTransaction: Transaction = {
    userEmail: 'Test',
    accountName: 'Test',
    amount: 'Test',
    payee: 'Test',
    date: 'Test',
    type: 'Test'
  };
  private transactionSource = new BehaviorSubject<Transaction[]>([this.initTransaction]);
  transactions$ = this.transactionSource.asObservable();

  constructor(private http: HttpClient) { }

  // Save transactions and update observable
  saveTransactions(userEmail: string, transactions: Transaction[]): void{
    this.http.post<Transaction[]>(this.baseUrl + userEmail, transactions).subscribe(
      result => {
        console.log('What was returned by the server:');
        console.log(result);
        this.transactionSource.next(result);
      },
      err => {
        console.log(err);
      }
    );
  }

  getTransactions(userEmail: string): void {
    this.http.get<Transaction[]>(this.baseUrl + userEmail).pipe(
      tap(result => console.log(result))
    ).subscribe(
      result => {
        this.transactionSource.next(result);
      },
      err => {
        console.log(err);
      }
    );
  }
}
