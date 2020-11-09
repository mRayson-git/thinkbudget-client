import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementComponent } from './account-management.component';
import { SharedModule } from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



@NgModule({
  declarations: [AccountManagementComponent, AccountSettingsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AccountManagementModule { }
