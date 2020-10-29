import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementComponent } from './account-management.component';
import { ParserCreatorComponent } from './parser-creator/parser-creator.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AccountManagementComponent, ParserCreatorComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AccountManagementModule { }
