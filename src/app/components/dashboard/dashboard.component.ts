import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/shared/models/user';
import { UserService } from 'src/app/modules/login/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrUser();
  }

}
