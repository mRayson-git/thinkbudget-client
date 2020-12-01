import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/shared/models/user';
import { UserService } from 'src/app/modules/login/user.service';
import { EChartOption } from 'echarts';
import { TransactionService } from 'src/app/modules/transaction-management/transaction.service';
import { BudgetService } from 'src/app/modules/budget-management/budget.service';
import { Budget } from 'src/app/modules/shared/models/budget';
import { Transaction } from 'src/app/modules/shared/models/transaction';
import { ParserService } from 'src/app/modules/login/parser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  budget: Budget;
  today = new Date();
  transactionsTimeframe: Transaction[] = [];
  allTransactions: Transaction[] = [];
  accounts: string[] = [];

  incomeThisMonth = 0;
  spendingThisMonth = 0;
  netChangeThisMonth = 0;

  constructor(
    private userService: UserService,
    private transactionService: TransactionService,
    private budgetService: BudgetService,
    private parserService: ParserService
    ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrUser();
    this.budgetService.getBudget(this.user.email).subscribe(budget => this.budget = budget);
    this.parserService.getProfiles(this.user.email).subscribe(profiles => {
      profiles.forEach(profile => {
        this.accounts.push(profile.accountName);
      });
    });
    this.transactionService.transactionsTimeframe$.subscribe(transaction => {
      this.transactionsTimeframe.push(transaction);
      if (transaction.category !== 'Bill Payment') {
        if (parseInt(transaction.amount) >= 0) {
          this.incomeThisMonth = this.incomeThisMonth + parseInt(transaction.amount);
        } else {
          this.spendingThisMonth = this.spendingThisMonth + parseInt(transaction.amount);
        }
        this.netChangeThisMonth = this.netChangeThisMonth + parseInt(transaction.amount);
      }
    });
    this.transactionService.transactions$.subscribe(transaction => this.allTransactions.push(transaction));
    this.transactionService.getTransactions(this.user.email);
    this.transactionService.getTransactionsForTimeframe(this.user.email, `${this.today.getFullYear()}-${this.today.getMonth() + 1}`);
  }

  inTheRed(): boolean {
    return this.netChangeThisMonth < 0;
  }

  // getTotalForAccount(accountName: string): number {
  //   let balance = 0;
  //   this.allTransactions.forEach(transaction => {
  //     if (transaction.accountName === accountName) {
  //       balance = balance + parseInt(transaction.amount);
  //     }
  //   });
  //   console.log(accountName + ': ' + balance);
  //   return balance;
  // }
}
