import { SearchModel } from '../../models/search.model';
import { UserInfoModel } from '../../models/user-info.model';

export class GetUsersAction {
  static readonly desc = 'Get all found users';
  static readonly type = '[Users] Get Users';
}

export class FindUsersAction {
  static readonly desc = 'Find users';
  static readonly type = '[Users] Find Users';
  constructor(public payload: SearchModel) {}
}

export class OpenUserAction {
  static readonly desc = 'Toggle user when click';
  static readonly type = '[Users] Open User';
  constructor(public userId: number) {}
}

export class EditUserAction {
  static readonly desc = 'Set user id and address index for edit';
  static readonly type = '[User] Edit User';
  constructor(public userId: number, public addressIndex: number | null) {}
}

export class ExitEditUserAction {
  static readonly desc = '';
  static readonly type = '[User] Exit Edit User';
}

export class UpdateUserAction {
  static readonly desc = 'Update User';
  static readonly type = '[Users] Update User';
  constructor(public id: number, public user: UserInfoModel) {}
}

export class SetDeleteUserInfoAction {
  static readonly desc = 'Delete user or user address';
  static readonly type = '[Users] Set Delete User info';
  constructor(public userId: number, public user: UserInfoModel | null) {}
}

export class DeleteUserDefaultAction {
  static readonly desc = 'Set default value for deleting';
  static readonly type = '[Users] Default Deleting Value';
}

export class DeleteUserAction {
  static readonly desc = 'Delete user';
  static readonly type = '[Users] Delete user';
}

export class DeleteUserAddressAction {
  static readonly desc = 'Delete user address';
  static readonly type = '[Users] Delete user address';
}

export class ResetStateAction {
  static readonly desc = 'Reset state to default';
  static readonly type = '[Users] Reset State';
}
