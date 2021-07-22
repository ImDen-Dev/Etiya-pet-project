import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../shared/models/user.model';
import { Store } from '@ngxs/store';
import { AuthState } from '../shared/states/auth-state/auth.state';
import { CreateUserState } from '../shared/states/create-user-state/create-user.state';
import {
  ResetCreateUserStateAction,
  SaveUserAction,
} from '../shared/states/create-user-state/create-user.actions';
import {
  StartLoading,
  StopLoading,
} from '../shared/states/ui-state/ui.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  userInfo!: UserModel | null;
  isSummary = true;
  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.isSummary = this.router.url === '/create-user/summary';
    this.userInfo = this.isSummary
      ? this.store.selectSnapshot(CreateUserState.getUser)
      : this.store.selectSnapshot(AuthState.getUser);
  }

  previousPage() {
    this.router.navigate(['/create-user/address']);
  }

  onCancel() {
    this.store.dispatch(new ResetCreateUserStateAction());
    this.router.navigate(['/create-user']);
  }

  onSave() {
    this.store.dispatch(new SaveUserAction());
    this.router.navigate(['/login']);
    this.store.dispatch(new ResetCreateUserStateAction());
  }
}
