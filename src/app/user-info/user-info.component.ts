import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../shared/models/user.model';
import { AddressModel } from '../shared/models/address.model';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserInfoModel } from '../shared/models/user-info.model';
import { Store } from '@ngxs/store';
import { AuthState } from '../shared/states/auth-state/auth.state';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() mainInfo!: UserModel;
  @Input() addressInfo!: AddressModel[];
  userInfo!: UserInfoModel;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    if (this.mainInfo && this.addressInfo) {
      this.userInfo = <UserInfoModel>{ ...this.mainInfo, ...this.addressInfo };
      return;
    }

    const user = this.store.selectSnapshot(AuthState.getUser);
    if (!user) {
      this.router.navigate(['login']);
      return;
    }
    this.userInfo = user;
  }
}
