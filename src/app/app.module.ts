import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginModule } from './modules/login/login.module';
import { TransactionManagementModule } from './modules/transaction-management/transaction-management.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptorService } from './modules/shared/services/token-interceptor.service';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AccountManagementModule } from './modules/account-management/account-management.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BudgetManagementModule } from './modules/budget-management/budget-management.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    TransactionManagementModule,
    AccountManagementModule,
    BudgetManagementModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
