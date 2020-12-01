import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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

  private transactionTimeframeSource = new Subject<Transaction>();
  transactionsTimeframe$ = this.transactionTimeframeSource.asObservable();

  private recentlyAdded = new BehaviorSubject<Transaction>(this.initTransaction);
  recentlyAddedTransactions$ = this.recentlyAdded.asObservable();

  constructor(private http: HttpClient) { }

  // Save transactions and update observable
  saveTransactions(userEmail: string, transactions: Transaction[]): void {
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

  updateTransaction(transId: string, transaction: Transaction): void {
    console.log('Updated transaction');
    this.http.put(this.baseUrl + transId, transaction).subscribe(
      res => { console.log(res); },
      err => { console.log(err); }
    );
  }

  setCategoryForAll(userEmail: string, payee: string, category: string): void {
    console.log('Setting category for all payee: ' + payee);
    this.http.put(this.baseUrl + 'updateCategories/' + userEmail, { payee, category } ).subscribe(
      res => { console.log(res); },
      err => { console.log(err); }
    );
  }

  setCategory(transaction: Transaction): void {
    this.http.put(this.baseUrl + 'updatecategory', transaction).subscribe(
      res => { console.log(res); },
      err => { console.log(err); }
    );
  }

  getTransactionsForTimeframe(userEmail: string, timeframe: string): void {
    console.log('Getting the transactions for: ' + timeframe);
    this.http.get<Transaction[]>(this.baseUrl + userEmail + '/' + timeframe).subscribe(
      transactions => {
        transactions.forEach(transaction => {
          this.transactionTimeframeSource.next(transaction);
        });
      },
      err => {
        console.error(err);
      }
    );
  }
}
