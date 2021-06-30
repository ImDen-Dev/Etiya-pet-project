import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../auth/user.model';
import { AddressModel } from '../auth/address.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() mainInfo!: UserModel;
  @Input() addressInfo!: AddressModel[];
  userInfo!: UserModel & AddressModel[];
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (!user) {
      this.router.navigate(['login']);
      return;
    }

    if (this.mainInfo && this.addressInfo) {
      this.userInfo = Object.assign(this.mainInfo, this.addressInfo);
      return;
    }

    this.userInfo = user;
  }
}
