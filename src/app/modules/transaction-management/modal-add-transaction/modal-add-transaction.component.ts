import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-add-transaction',
  templateUrl: './modal-add-transaction.component.html',
  styleUrls: ['./modal-add-transaction.component.scss']
})
export class ModalAddTransactionComponent implements OnInit {
  transForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.transForm = this.fb.group({
      date: [''],
      accountName: [''],
      amount: [''],
      payee: [''],
      description: [''],
      type: [''],
      category: ['Uncategorized']
    });
  }

}
