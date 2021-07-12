import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserInfoModel } from '../../shared/models/user-info.model';
import { CreateUserAction, LoginAction, LogoutAction } from './auth.actions';
import { AuthService } from '../../shared/services/auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export interface AuthStateModel {
  isAuthenticated: boolean;
  token: string;
  user: UserInfoModel | null;
}

@State<AuthStateModel>({
  name: 'Auth',
  defaults: {
    isAuthenticated: false,
    token: '',
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
  static getUserToken(state: AuthStateModel) {
    return state.token;
  }

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  @Action(LoginAction)
  login({ patchState }: StateContext<AuthStateModel>, action: LoginAction) {
    return this.authService.login(action.payload).pipe(
      catchError((err) => {
        return of({ token: '' });
      }),
      switchMap((req) => {
        patchState({
          token: req.token,
        });
        if (req.token.length > 0) {
          return this.authService.getUser(action.payload.email);
        } else {
          return of(null);
        }
      }),
      tap((user: UserInfoModel | null) => {
        patchState({
          isAuthenticated: !!user,
          user: user ? { ...user } : null,
        });
      })
    );
  }

  @Action(LogoutAction)
  logout({ patchState }: StateContext<AuthStateModel>) {
    patchState({
      isAuthenticated: false,
      token: '',
      user: null,
    });
  }

  @Action(CreateUserAction)
  createUser(
    { patchState }: StateContext<AuthStateModel>,
    action: CreateUserAction
  ) {
    return this.authService.createUser(action.payload);
  }
}
