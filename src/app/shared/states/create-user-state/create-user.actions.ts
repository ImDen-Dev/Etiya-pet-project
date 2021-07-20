import { UserInfoModel } from '../../models/userInfoModel';
import { AddressModel } from '../../models/address.model';

export class SetUserInfoAction {
  static readonly desc = 'Set User Info';
  static readonly type = '[Create User] Set User Info';
  constructor(public payload: UserInfoModel) {}
}

export class SetAddressInfoAction {
  static readonly desc = 'Set User Address Info';
  static readonly type = '[Create User] Set User Address Info';
  constructor(public payload: AddressModel[]) {}
}

export class SaveUserAction {
  static readonly desc = 'Save User';
  static readonly type = '[Create User] Save User';
}

export class ResetCreateUserStateAction {
  static readonly desc = 'Reset Create User State';
  static readonly type = '[Create User] Reset State';
}
