import { SearchModel } from '../search.model';
import { UserInfoModel } from '../../shared/user-info.model';

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

export class UpdateUserAddressAction {}

export class DeleteUserAction {}

export class DeleteUserAddressAction {}
