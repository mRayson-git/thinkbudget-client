import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BudgetManagementComponent } from './budget-management.component';
import { BudgetCreatorComponent } from './budget-creator/budget-creator.component';
import { CategoryCreatorComponent } from './category-creator/category-creator.component';



@NgModule({
  declarations: [BudgetManagementComponent, BudgetCreatorComponent, CategoryCreatorComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BudgetManagementModule { }
