import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParserProfile } from 'src/app/modules/shared/models/parserProfile';
import { User } from 'src/app/modules/shared/models/user';
import { UserService } from 'src/app/modules/login/user.service';
import { ParserService } from '../../login/parser.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  currUser: User;
  userForm: FormGroup;
  parserProfiles: ParserProfile[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private parserService: ParserService
    ) { }

  ngOnInit(): void {
    this.currUser = this.userService.getCurrUser();
    this.parserService.getProfiles(this.currUser.email)
    .subscribe(profiles => {
      this.parserProfiles = profiles;
    });
  }

}
