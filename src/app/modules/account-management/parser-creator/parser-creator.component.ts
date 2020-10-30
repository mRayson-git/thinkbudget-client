import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ParserProfile } from 'src/app/shared/models/parserProfile';
import { User } from 'src/app/shared/models/user';
import { ParserService } from 'src/app/shared/services/parser.service';
import { UserService } from 'src/app/login/user.service';

@Component({
  selector: 'app-parser-creator',
  templateUrl: './parser-creator.component.html',
  styleUrls: ['./parser-creator.component.scss']
})
export class ParserCreatorComponent implements OnInit {
  parserForm: FormGroup;
  currUser: User;
  alert: string;

  constructor(private fb: FormBuilder, private userService: UserService, private parserService: ParserService) { }

  ngOnInit(): void {
    this.currUser = this.userService.getCurrUser();
    this.parserForm = this.fb.group({
      accountName: ['', Validators.required],
      header: ['false'],
      dateCol: ['', Validators.required],
      amountCol: ['', Validators.required],
      payeeCol: ['', Validators.required],
      typeCol: ['', Validators.required]
    });
  }

  saveProfile(): void {
    const profile: ParserProfile = {
      userEmail: this.currUser.email,
      accountName: this.parserForm.get('accountName').value,
      header: this.parserForm.get('header').value,
      dateCol: this.parserForm.get('dateCol').value,
      amountCol: this.parserForm.get('amountCol').value,
      payeeCol: this.parserForm.get('payeeCol').value,
      typeCol: this.parserForm.get('typeCol').value
    };
    this.parserForm.reset();
    this.parserService.saveProfile(profile)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.alert = err.error;
        setTimeout(() => {
          this.alert = null;
        }, 3000);
      }
    );
  }

}
