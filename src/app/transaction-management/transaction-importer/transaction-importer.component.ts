import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCsvParser } from 'ngx-csv-parser';
import { ParserProfile } from 'src/app/shared/models/parserProfile';
import { Transaction } from 'src/app/shared/models/transaction';
import { User } from 'src/app/shared/models/user';
import { ParserService } from 'src/app/shared/services/parser.service';
import { UserService } from 'src/app/shared/services/user.service';



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

  constructor(
    private fb: FormBuilder,
    private ngxParser: NgxCsvParser,
    private parserService: ParserService,
    private userService: UserService
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
    });
  }

  fileSelected(files: FileList): void {
    this.fileToParse = files.item(0);
    const selectedProfile = this.parserProfiles[this.csvForm.get('parser').value];
    const transactions: Transaction[] = [];

    this.ngxParser.parse(this.fileToParse, { header: selectedProfile.header, delimiter: ',' })
    .pipe().subscribe((result: Array<any>) => {
      result.forEach(transaction => {
        transactions.push({
          userEmail: this.currUser.email,
          accountName: selectedProfile.accountName,
          date: transaction[selectedProfile.dateCol],
          amount: transaction[selectedProfile.amountCol],
          payee: transaction[selectedProfile.payeeCol],
          type: transaction[selectedProfile.typeCol],
        });
      });
      console.log(transactions);
    });

    // set alert
    this.alert = this.fileToParse.name + ' has been selected.';
    setTimeout(() => {
      this.alert = null;
    }, 3000);
  }

  updateProfiles(): void {
    this.parserService.getProfiles(this.currUser.email)
    .subscribe(
      res => {
        this.parserProfiles = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }

}