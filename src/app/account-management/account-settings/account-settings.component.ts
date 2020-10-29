import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParserProfile } from 'src/app/shared/models/parserProfile';
import { User } from 'src/app/shared/models/user';
import { ParserService } from 'src/app/shared/services/parser.service';
import { UserService } from 'src/app/shared/services/user.service';

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
