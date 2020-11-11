import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Observer } from 'rxjs';

import { Transaction } from 'src/app/modules/shared/models/transaction';
import { User } from 'src/app/modules/shared/models/user';
import { TransactionService } from '../transaction.service';
import { UserService } from 'src/app/modules/login/user.service';
import { ModalRecordComponent } from '../modal-record/modal-record.component';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  currUser: User;
  transactions: Transaction[] = [];
  filter: FormGroup;

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
    console.log('Subscribing to transaction stream');
    this.transactionService.transactions$.subscribe(transaction => {
      this.transactions.push(transaction);
    });
    this.transactionService.getTransactions(this.currUser.email);
  }

  showModal(transaction: Transaction): void {
    const modalRef = this.modalService.open(ModalRecordComponent);
    modalRef.componentInstance.transaction = transaction;
  }

  sortOnCategory(): void {
  }
}
