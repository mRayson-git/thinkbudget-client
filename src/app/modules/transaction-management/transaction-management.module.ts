import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCsvParserModule } from 'ngx-csv-parser';

import { SharedModule } from '../shared/shared.module';
import { TransactionManagementComponent } from './transaction-management.component';
import { TransactionImporterComponent } from './transaction-importer/transaction-importer.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ModalRecordComponent } from './modal-record/modal-record.component';
import { ModalRecentlyAddedComponent } from './modal-recently-added/modal-recently-added.component';
import { ModalAddTransactionComponent } from './modal-add-transaction/modal-add-transaction.component';
import { CategorySetterComponent } from './category-setter/category-setter.component';



@NgModule({
  declarations: [
    TransactionManagementComponent,
    TransactionImporterComponent,
    TransactionListComponent,
    ModalRecordComponent,
    ModalRecentlyAddedComponent,
    ModalAddTransactionComponent,
    CategorySetterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxCsvParserModule
  ]
})
export class TransactionManagementModule { }
