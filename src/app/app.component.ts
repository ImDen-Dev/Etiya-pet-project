import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UiState } from './shared/states/ui-state/ui.state';
import { Observable } from 'rxjs';
import {
  LoggedUser,
  LoginAction,
} from './shared/states/auth-state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pet-project';

  constructor(private store: Store) {}

  @Select(UiState.isLoading) isLoading$!: Observable<boolean>;

  ngOnInit() {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const user = JSON.parse(localUser);
      this.store.dispatch(new LoggedUser(user));
    }
  }
}
