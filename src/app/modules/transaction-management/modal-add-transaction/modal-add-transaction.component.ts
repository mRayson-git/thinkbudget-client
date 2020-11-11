import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../../shared/models/transaction';
import { User } from '../../shared/models/user';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-modal-add-transaction',
  templateUrl: './modal-add-transaction.component.html',
  styleUrls: ['./modal-add-transaction.component.scss']
})
export class ModalAddTransactionComponent implements OnInit {
  @Input() user: User;
  transForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.transForm = this.fb.group({
      date: ['', Validators.required],
      accountName: ['', Validators.required],
      amount: ['', Validators.required],
      payee: ['', Validators.required],
      type: ['', Validators.required],
      category: ['Uncategorized']
    });
  }

  saveTransaction(): void {
    const transactions: Transaction[] = [
      {
        userEmail: this.user.email,
        accountName: this.transForm.get('accountName').value,
        date: this.transForm.get('date').value,
        amount: this.transForm.get('amount').value,
        payee: this.transForm.get('payee').value,
        type: this.transForm.get('type').value,
        category: this.transForm.get('type').value
      }
    ];
    this.transactionService.saveTransactions(this.user.email, transactions);
    this.transactionService.getTransactions(this.user.email);
  }

}
