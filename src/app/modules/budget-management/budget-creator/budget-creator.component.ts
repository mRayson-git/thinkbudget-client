import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../login/user.service';
import { Budget } from '../../shared/models/budget';
import { Category } from '../../shared/models/category';
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
  message: string;
  budgetNeeds: Category[] = [];
  budgetWants: Category[] = [];
  budgetFuture: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrUser();
    this.budgetForm = this.fb.group({
      categoryName: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', Validators.required],
      colour: ['#00008B', Validators.required]
    });
    this.budgetService.getBudget(this.user.email).subscribe(
      // if budget exists
      budget => {
        this.budget = budget;
        this.updateFilters();
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
        this.removeCategory(catExists);
      }
      this.budget.budgetCategories.push( {
        categoryName: this.budgetForm.get('categoryName').value,
        type: this.budgetForm.get('type').value,
        amount: this.budgetForm.get('amount').value,
        colour: this.budgetForm.get('colour').value
      });
    } else {
      this.budget.budgetCategories = [{
        categoryName: this.budgetForm.get('categoryName').value,
        type: this.budgetForm.get('type').value,
        amount: this.budgetForm.get('amount').value,
        colour: this.budgetForm.get('colour').value
      }];
    }
    this.updateFilters();
    console.log(this.budget);
    console.log(this.budgetWants);
    this.budgetForm.reset({categoryName: '', amount: '', colour: '#00008B'});
  }

  saveBudget(): void {
    this.budgetService.updateBudget(this.budget).subscribe(
      res => {
        this.message = 'Saved!';
        setTimeout(() => {
          this.message = null;
        }, 2000);
      },
      err => { console.log(err); }
    );
  }

  removeCategory(category: Category): void {
    console.log(category);
    this.budget.budgetCategories.splice(this.budget.budgetCategories.indexOf(category), 1);
    this.updateFilters();
  }

  updateFilters(): void {
    this.budgetNeeds = this.budget.budgetCategories.filter(category => category.type === 'Monthly Expenses');
    this.budgetWants = this.budget.budgetCategories.filter(category => category.type === 'Everyday Expenses');
    this.budgetFuture = this.budget.budgetCategories.filter(category => category.type === 'Future Financial Planning');
  }
}
