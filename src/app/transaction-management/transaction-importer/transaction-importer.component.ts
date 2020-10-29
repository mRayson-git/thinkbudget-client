import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCsvParser } from 'ngx-csv-parser';



@Component({
  selector: 'app-transaction-importer',
  templateUrl: './transaction-importer.component.html',
  styleUrls: ['./transaction-importer.component.scss']
})
export class TransactionImporterComponent implements OnInit {
  csvForm: FormGroup;
  alert: string;
  fileToParse: File = null;

  constructor(private fb: FormBuilder, private ngxParser: NgxCsvParser) { }

  ngOnInit(): void {
    this.csvForm = this.fb.group({
      parser: ['', Validators.required],
    });
  }

  fileSelected(files: FileList): void {
    this.fileToParse = files.item(0);

    this.ngxParser.parse(this.fileToParse, { header: false, delimiter: ',' })
    .pipe().subscribe((result: Array<any>) => {
      console.log('Result:', result);
    });

    // set alert
    this.alert = this.fileToParse.name + ' has been selected.';
    setTimeout(() => {
      this.alert = null;
    }, 3000);
  }

}
