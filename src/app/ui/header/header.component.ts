import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AuthState } from '../../auth/auth-state/auth.state';
import { LogoutAction } from '../../auth/auth-state/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store) {}

  @Select(AuthState.isAuth) isAuth$!: Observable<boolean>;

  ngOnInit(): void {}

  onLogout() {
    this.store.dispatch(new LogoutAction());
  }
}
