import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../auth/user.model';
import { AddressModel } from '../auth/address.model';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoModel } from '../shared/user-info.model';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.mainInfo && this.addressInfo) {
      this.userInfo = <UserInfoModel>(
        Object.assign(this.mainInfo, this.addressInfo)
      );
      return;
    }

    const user = this.authService.getUser();
    console.log(user);
    if (!user) {
      this.router.navigate(['login']);
      return;
    }

    this.userInfo = user;
  }
}
