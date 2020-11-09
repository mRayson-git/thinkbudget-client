import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCsvParser } from 'ngx-csv-parser';
import { ParserProfile } from 'src/app/modules/shared/models/parserProfile';
import { Transaction } from 'src/app/modules/shared/models/transaction';
import { User } from 'src/app/modules/shared/models/user';
import { ParserService } from 'src/app/modules/login/parser.service';
import { TransactionService } from '../transaction.service';
import { UserService } from 'src/app/modules/login/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRecentlyAddedComponent } from '../modal-recently-added/modal-recently-added.component';
import { skip } from 'rxjs/operators';
import { ModalAddTransactionComponent } from '../modal-add-transaction/modal-add-transaction.component';



@Component({
  selector: 'app-transaction-importer',
  templateUrl: './transaction-importer.component.html',
  styleUrls: ['./transaction-importer.component.scss']
})
export class TransactionImporterComponent implements OnInit {
  csvForm: FormGroup;
  alert: string;
  fileToParse: File = null;
  parserProfiles: ParserProfile[] = [];
  currUser: User;
  transactions: Transaction[] = [];

  constructor(
    private fb: FormBuilder,
    private ngxParser: NgxCsvParser,
    private parserService: ParserService,
    private userService: UserService,
    private transactionService: TransactionService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.currUser = this.userService.getCurrUser();
    this.parserService.getProfiles(this.currUser.email)
    .subscribe(
      res => {
        this.parserProfiles = res;
      },
      err => {
        console.log(err.error);
      }
    );
    this.csvForm = this.fb.group({
      parser: ['', Validators.required],
      file: ['']
    });
    // get recently added transactions
    this.transactionService.recentlyAddedTransactions$.pipe(skip(1)).subscribe(
      transaction => {
        this.transactions.push(transaction);
      }
    );
  }

  fileSelected(files: FileList): void {
    this.fileToParse = files.item(0);
    const selectedProfile = this.parserProfiles[this.csvForm.get('parser').value];
    const transactions: Transaction[] = [];

    this.ngxParser.parse(this.fileToParse, { header: false, delimiter: ',' })
    .pipe().subscribe((result: Array<any>) => {
      // If there is a header, remove first entry
      if (selectedProfile.header){
        result.shift();
      }
      result.forEach(transaction => {
        transactions.push({
          userEmail: this.currUser.email,
          accountName: selectedProfile.accountName,
          date: transaction[selectedProfile.dateCol],
          amount: transaction[selectedProfile.amountCol],
          payee: transaction[selectedProfile.payeeCol] || '???',
          type: transaction[selectedProfile.typeCol],
          description: '',
          category: 'Uncategorized'
        });
      });
      this.transactionService.saveTransactions(this.currUser.email, transactions);
    });
    this.csvForm.get('file').reset();
  }

  // modal for seeing recently added transactions
  showRecentlyAddedModal(): void {
    const modalRef = this.modalService.open(ModalRecentlyAddedComponent);
    modalRef.componentInstance.recentlyAdded = this.transactions;
  }

  // modal for adding custom transaction
  showCustomTransactionModal(): void {
    const modalRef = this.modalService.open(ModalAddTransactionComponent);
  }
}
