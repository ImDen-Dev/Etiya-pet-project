import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserInfoModel } from '../../shared/user-info.model';
import { CreateUserAction, LoginAction, LogoutAction } from './auth.actions';
import { AuthService } from '../auth.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface AuthStateModel {
  isAuthenticated: boolean;
  user: UserInfoModel | null;
}

@State<AuthStateModel>({
  name: 'Auth',
  defaults: {
    isAuthenticated: true,
    user: null,
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static isAuth(state: AuthStateModel) {
    return state.isAuthenticated;
  }

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  @Action(LoginAction)
  login(
    ctx: StateContext<AuthStateModel>,
    action: LoginAction
  ): Observable<UserInfoModel | null> {
    return this.authService.login(action.payload).pipe(
      map((loginResult) =>
        loginResult.length > 0 ? (loginResult[0] as UserInfoModel) : null
      ),
      tap((user) => {
        if (user) {
          ctx.patchState({
            isAuthenticated: true,
            user: { ...user },
          });
        }
      })
    );
  }

  @Action(LogoutAction)
  logout({ patchState }: StateContext<AuthStateModel>) {
    patchState({
      isAuthenticated: false,
      user: null,
    });
  }

  @Action(CreateUserAction)
  createUser(
    { patchState }: StateContext<AuthStateModel>,
    action: CreateUserAction
  ) {
    return this.authService.createUser(action.payload).pipe(
      tap((user) => {
        patchState({
          isAuthenticated: true,
          user: { ...user },
        });
      })
    );
  }
}
