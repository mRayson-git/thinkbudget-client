import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../login/user.service';
import { Budget } from '../../shared/models/budget';
import { User } from '../../shared/models/user';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-budget-creator',
  templateUrl: './budget-creator.component.html',
  styleUrls: ['./budget-creator.component.scss']
})
export class BudgetCreatorComponent implements OnInit {
  budgetForm: FormGroup;
  budget: Budget;
  user: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrUser();
    this.budgetForm = this.fb.group({
      categoryName: '',
      amount: '',
      colour: ''
    });
    this.budget = { userEmail: this.user.email };
  }

  updateBudget(): void {
    if (this.budget.budgetCategories) {
      this.budget.budgetCategories.push( {
        categoryName: this.budgetForm.get('categoryName').value,
        amount: this.budgetForm.get('amount').value,
        colour: this.budgetForm.get('colour').value
      });
    } else {
      this.budget.budgetCategories = [{
        categoryName: this.budgetForm.get('categoryName').value,
        amount: this.budgetForm.get('amount').value,
        colour: this.budgetForm.get('colour').value
      }];
    }
    this.budgetForm.reset();
  }

  saveBudget(): void {
    this.budgetService.updateBudget(this.budget).subscribe(
      res => { console.log(res); },
      err => { console.log(err); }
    );
  }
}
