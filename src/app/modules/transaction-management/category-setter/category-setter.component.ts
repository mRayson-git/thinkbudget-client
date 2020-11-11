import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { BudgetService } from '../../budget-management/budget.service';
import { UserService } from '../../login/user.service';
import { Budget } from '../../shared/models/budget';
import { User } from '../../shared/models/user';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-category-setter',
  templateUrl: './category-setter.component.html',
  styleUrls: ['./category-setter.component.scss']
})
export class CategorySetterComponent implements OnInit {
  payees: string[] = [];
  categoryForm: FormGroup;
  newCatForm: FormGroup;
  delCatForm: FormGroup;
  user: User;
  budget: Budget;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private userService: UserService,
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrUser();
    this.categoryForm = this.fb.group({
      payee: '',
      category: '',
    });
    this.newCatForm = this.fb.group({
      category: ['', Validators.required]
    });
    this.delCatForm = this.fb.group({
      category: ['', Validators.required]
    });
    this.transactionService.getTransactions(this.user.email);
    this.transactionService.transactions$.pipe(
      filter(transaction => transaction.category === 'Uncategorized')
    ).subscribe(transaction => {
      if (!this.payees.includes(transaction.payee)){
        this.payees.push(transaction.payee);
      }
    });
    console.log(this.payees);
    this.budgetService.getBudget(this.user.email).subscribe(budget => this.budget = budget);
  }

  saveChanges(): void {
    this.transactionService.setCategoryForAll(
      this.user.email,
      this.payees[this.categoryForm.get('payee').value],
      this.categoryForm.get('category').value
    );
    this.payees.splice(this.categoryForm.get('payee').value, 1);
    this.categoryForm.reset();
  }

  addCategory(): void {
    if (!this.budget.categories.includes(this.newCatForm.get('category').value)) {
      this.budget.categories.push(this.newCatForm.get('category').value);
      this.budget.categories.sort();
    }
    this.budgetService.updateBudget(this.budget).subscribe();
    this.newCatForm.reset();
  }

  delCategory(): void {
    this.budget.categories.splice(this.budget.categories.indexOf(this.delCatForm.get('category').value), 1);
    this.budgetService.updateBudget(this.budget).subscribe();
    this.delCatForm.reset();
  }

}
