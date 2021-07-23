import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserModel } from '../../models/user.model';
import { LoggedUser, LoginAction, LogoutAction } from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

export interface AuthStateModel {
  isAuthenticated: boolean;
  token: string;
  user: UserModel | null;
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
  login(
    { patchState, getState }: StateContext<AuthStateModel>,
    action: LoginAction
  ) {
    return this.authService.login(action.payload).pipe(
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
      tap((user: UserModel | null) => {
        patchState({
          isAuthenticated: !!user,
          user: user ? { ...user } : null,
        });
        const state = getState();
        if (state.isAuthenticated)
          localStorage.setItem('user', JSON.stringify(state));
      }),
      catchError((err) => throwError(err))
    );
  }

  @Action(LoggedUser) loggedUser(
    { setState }: StateContext<AuthStateModel>,
    { payload }: LoggedUser
  ) {
    setState({
      user: payload.user,
      token: payload.token,
      isAuthenticated: payload.isAuthenticated,
    });
  }

  @Action(LogoutAction)
  logout({ patchState }: StateContext<AuthStateModel>) {
    patchState({
      isAuthenticated: false,
      token: '',
      user: null,
    });
    localStorage.removeItem('user');
  }
}
