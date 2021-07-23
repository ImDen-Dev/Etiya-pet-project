import { UserModel } from '../../models/user.model';
import { AuthStateModel } from './auth.state';

export class LoginAction {
  static readonly desc = 'Login user';
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string }) {}
}

export class LogoutAction {
  static readonly desc = 'Logout user';
  static readonly type = '[Auth] Logout';
}

export class LoggedUser {
  static readonly desc = 'Set Logged user';
  static readonly type = '[Auth] Logged User';
  constructor(public payload: AuthStateModel) {}
}
