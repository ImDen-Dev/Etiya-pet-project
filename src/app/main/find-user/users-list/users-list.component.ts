import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { UserInfoModel } from '../../../shared/user-info.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: UserInfoModel[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.foundUsers.subscribe((users) => (this.users = users));
  }
}
