import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-category-creator',
  templateUrl: './category-creator.component.html',
  styleUrls: ['./category-creator.component.scss']
})
export class CategoryCreatorComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ''
    });
  }

  saveCategory(): void {

  }

}
