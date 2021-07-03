import { UserInfoModel } from '../../shared/user-info.model';

export class LoginAction {
  static readonly desc = 'Login user';
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string }) {}
}

export class LogoutAction {
  static readonly desc = 'Logout user';
  static readonly type = '[Auth] Logout';
}

export class CreateUserAction {
  static readonly desc = 'Create new User';
  static readonly type = '[Auth] Create User';
  constructor(public payload: UserInfoModel) {}
}
