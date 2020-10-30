import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Transaction } from 'src/app/shared/models/transaction';
import { User } from 'src/app/shared/models/user';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ModalRecordComponent } from '../modal-record/modal-record.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  currUser: User;
  transList: Transaction[] = [];
  filter: FormGroup;
  transListObs: Observable<Transaction[]>;

  // Filter things
  accountNames: string[] = [];
  payees: string[] = [];
  types: string[] = [];
  categories: string[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.currUser = this.userService.getCurrUser();
    this.filter = this.fb.group({
      accountName: [''],
      date: [''],
      payee: [''],
      type: [''],
      category: ['']
    });
    this.transListObs = this.transactionService.getAllTransactions(this.currUser.email);
    this.transListObs
    .subscribe(
      res => {
        this.transList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  showModal(transaction: Transaction): void {
    const modalRef = this.modalService.open(ModalRecordComponent);
    modalRef.componentInstance.transaction = transaction;
  }

  filterOnAccount(accountName: string): void {
    this.transListObs.pipe(
      map(transactions => transactions.filter(transaction => transaction.accountName === accountName))
    ).subscribe(transactions => {
      this.transList = transactions;
    });
  }

  filterOnPayee(payee: string): void {
    this.transListObs.pipe(
      map(transactions => transactions.filter(transaction => transaction.payee.includes(payee)))
    ).subscribe(transactions => {
      this.transList = transactions;
    });
  }


}
