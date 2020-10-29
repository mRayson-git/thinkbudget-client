import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCsvParserModule } from 'ngx-csv-parser';

import { SharedModule } from '../shared/shared.module';
import { TransactionManagementComponent } from './transaction-management.component';
import { TransactionImporterComponent } from './transaction-importer/transaction-importer.component';



@NgModule({
  declarations: [
    TransactionManagementComponent,
    TransactionImporterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxCsvParserModule
  ]
})
export class TransactionManagementModule { }
