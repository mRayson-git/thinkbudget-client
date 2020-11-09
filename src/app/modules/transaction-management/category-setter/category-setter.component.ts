import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../login/user.service';
import { User } from '../../shared/models/user';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-category-setter',
  templateUrl: './category-setter.component.html',
  styleUrls: ['./category-setter.component.scss']
})
export class CategorySetterComponent implements OnInit {
  categoryForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrUser();
    this.categoryForm = this.fb.group({
      payee: '',
      category: ''
    });
  }

}
