import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from 'src/app/modules/shared/models/transaction';
import { BudgetService } from '../../budget-management/budget.service';
import { Budget } from '../../shared/models/budget';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-modal-record',
  templateUrl: './modal-record.component.html',
  styleUrls: ['./modal-record.component.scss']
})
export class ModalRecordComponent implements OnInit {
  @Input() transaction: Transaction;
  transForm: FormGroup;
  catForm: FormGroup;
  budget: Budget;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private budgetService: BudgetService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.transaction);
    this.budgetService.getBudget(this.transaction.userEmail).subscribe(budget => this.budget = budget);
    this.transForm = this.fb.group({
      note: [this.transaction.note]
    });
    this.catForm = this.fb.group({
      category: ''
    });
  }

  addNote(): void {
    this.transaction.note = this.transForm.get('note').value;
    this.transactionService.updateTransaction(this.transaction._id, this.transaction);
    this.activeModal.close();
  }

  setCategory(): void {
    this.transaction.category = this.catForm.get('category').value;
    this.transactionService.updateTransaction(this.transaction._id, this.transaction);
    this.activeModal.close();
  }
}
