import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction';

@Component({
  selector: 'app-modal-record',
  templateUrl: './modal-record.component.html',
  styleUrls: ['./modal-record.component.scss']
})
export class ModalRecordComponent implements OnInit {
  @Input() transaction: Transaction;
  constructor() { }

  ngOnInit(): void {
    console.log(this.transaction);
  }

}
