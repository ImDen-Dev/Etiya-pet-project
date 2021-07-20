import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoModel } from '../shared/models/userInfoModel';
import { AuthService } from '../shared/services/auth.service';
import { AddressModel } from '../shared/models/address.model';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { CreateUserAction } from '../shared/states/auth-state/auth.actions';
import { AuthState } from '../shared/states/auth-state/auth.state';
import {
  StartLoading,
  StopLoading,
} from '../shared/states/ui-state/ui.actions';
import { tap } from 'rxjs/operators';
import { UserModel } from '../shared/models/user.model';
import { slideInAnimation } from './router.animation';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  animations: [slideInAnimation],
})
export class CreateUserComponent implements OnInit {
  page = 'mainInfo';
  mainInfo!: FormGroup;
  addressInfo!: FormGroup;
  user!: UserInfoModel;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {}

  changePage(pageName: string) {
    this.page = pageName;
  }

  onCancel() {
    this.page = 'mainInfo';
    this.addressInfo.reset();
    this.mainInfo.reset();
  }

  onSave() {
    const userInfo: UserInfoModel = <UserInfoModel>this.mainInfo.value;
    delete userInfo.confirmPassword;
    const addressInfo: AddressModel[] = this.addressInfo.value;
    const user = <UserModel>{ ...userInfo, userAddress: [...addressInfo] };
    this.store
      .dispatch(new CreateUserAction(user))
      .pipe(tap(() => this.store.dispatch(new StartLoading())))
      .subscribe(() => {
        const isAuth = this.store.selectSnapshot(AuthState.isAuth);
        isAuth
          ? this.router.navigate(['user-info'])
          : this.router.navigate(['login']);
        this.store.dispatch(new StopLoading());
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
