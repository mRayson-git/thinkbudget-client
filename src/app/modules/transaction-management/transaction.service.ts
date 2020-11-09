import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from, Subject } from 'rxjs';
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
  private transactionSource = new Subject<Transaction>();
  transactions$ = this.transactionSource.asObservable();

  private recentlyAdded = new BehaviorSubject<Transaction>(this.initTransaction);
  recentlyAddedTransactions$ = this.recentlyAdded.asObservable();

  constructor(private http: HttpClient) { }

  // Save transactions and update observable
  saveTransactions(userEmail: string, transactions: Transaction[]): void{
    // returning array of new transactions added
    this.http.post<Transaction[]>(this.baseUrl + userEmail, transactions).subscribe(
      newTransactions => {
        newTransactions.forEach(transaction => {
          console.log('Adding transaction to recently added stream');
          this.recentlyAdded.next(transaction);
        });
      },
      err => {
        console.error(err);
      }
    );
  }

  getTransactions(userEmail: string): void {
    this.http.get<Transaction[]>(this.baseUrl + userEmail).subscribe(
      transactions => {
        transactions.forEach(transaction => {
          this.transactionSource.next(transaction);
        });
      },
      err => {
        console.error(err);
      }
    );
  }
}
