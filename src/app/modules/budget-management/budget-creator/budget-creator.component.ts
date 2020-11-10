import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      categoryName: ['', Validators.required],
      amount: ['', Validators.required],
      colour: ['#00008B', Validators.required]
    });
    this.budgetService.getBudget(this.user.email).subscribe(
      // if budget exists
      budget => {
        this.budget = budget;
      },
      // if budget does not exist
      err => {
        this.budget = { userEmail: this.user.email };
      }
    );
  }

  updateBudget(): void {
    if (this.budget.budgetCategories) {
      // budget categories do exist, check if category already there
      let catExists = null;
      this.budget.budgetCategories.forEach(category => {
        if (this.budgetForm.get('categoryName').value === category.categoryName) {
          catExists = category;
        }
      });
      // if category already there, replace it
      if (catExists) {
        this.removeAtIndex(this.budget.budgetCategories.indexOf(catExists));
      }
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
    this.budgetForm.reset({categoryName: '', amount: '', colour: '#00008B'});
  }

  saveBudget(): void {
    this.budgetService.updateBudget(this.budget).subscribe(
      res => { console.log(res); },
      err => { console.log(err); }
    );
  }

  removeAtIndex(index: number): void {
    this.budget.budgetCategories.splice(index, 1);
  }
}
