import { SearchModel } from '../search.model';

export class GetUsersAction {
  static readonly desc = 'Get all found users';
  static readonly type = '[Users] Get Users';
}

export class FindUsersAction {
  static readonly desc = 'Find users';
  static readonly type = '[Users] Find Users';
  constructor(public payload: SearchModel) {}
}

export class DeleteUserAction {}

export class DeleteUserAddressAction {}

export class UpdateUserAction {}

export class UpdateUserAddressAction {}
