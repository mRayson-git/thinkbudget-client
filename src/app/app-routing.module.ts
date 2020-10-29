import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ParserCreatorComponent } from './account-management/parser-creator/parser-creator.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TransactionManagementComponent } from './transaction-management/transaction-management.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionManagementComponent, canActivate: [AuthGuard] },
  { path: 'accountsettings', component: AccountManagementComponent, canActivate: [AuthGuard] },
  { path: 'profilesettings/:accountName', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'parsercreation', component: ParserCreatorComponent, canActivate: [AuthGuard] },
  { path: '', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
