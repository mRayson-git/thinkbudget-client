import { Component, Input, OnInit } from '@angular/core';
import { skip } from 'rxjs/operators';
import { Transaction } from '../../shared/models/transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-modal-recently-added',
  templateUrl: './modal-recently-added.component.html',
  styleUrls: ['./modal-recently-added.component.scss']
})
export class ModalRecentlyAddedComponent implements OnInit {
  @Input() recentlyAdded: Transaction[];
  constructor() { }

  ngOnInit(): void {
    console.log(this.recentlyAdded);
  }

}
