import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginModule } from './login/login.module';
import { TransactionManagementModule } from './transaction-management/transaction-management.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AccountManagementModule } from './account-management/account-management.module';

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
    AccountManagementModule
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
