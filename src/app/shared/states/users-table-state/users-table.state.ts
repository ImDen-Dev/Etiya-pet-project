import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserModel } from '../../models/user.model';
import { Injectable } from '@angular/core';
import {
  SetDeleteUserInfoAction,
  EditUserAction,
  ExitEditUserAction,
  OpenUserAction,
  UpdateUserAction,
  DeleteUserAction,
  DeleteUserAddressAction,
  DeleteUserDefaultAction,
  ResetStateAction,
} from './users-table.actions';
import { UserService } from '../../services/user.service';
import { FilterUsersAction } from '../search-state/search.actions';

export interface UsersTableStateModel {
  openUser: number | null;
  edit: {
    userId: number | null;
    addressIndex: number | null;
  };
  deleteInfo: { userId: number | null; user: UserModel | null };
}

@State<UsersTableStateModel>({
  name: 'users',
  defaults: {
    openUser: null,
    edit: { userId: null, addressIndex: null },
    deleteInfo: { userId: null, user: null },
  },
})
@Injectable()
export class UsersTableState {
  constructor(private userService: UserService) {}

  @Selector()
  static getOpenUser({ openUser }: UsersTableStateModel): number | null {
    return openUser;
  }

  @Selector()
  static edit({ edit }: UsersTableStateModel): {
    userId: number | null;
    addressIndex: number | null;
  } {
    return edit;
  }

  @Selector()
  static deleteInfo({ deleteInfo }: UsersTableStateModel): {
    userId: number | null;
    user: UserModel | null;
  } {
    return deleteInfo;
  }

  @Action(OpenUserAction)
  openUser(
    { patchState, getState }: StateContext<UsersTableStateModel>,
    { userId }: OpenUserAction
  ) {
    patchState({
      openUser: getState().openUser === userId ? null : userId,
    });
  }

  @Action(EditUserAction)
  editUser(
    { patchState, getState }: StateContext<UsersTableStateModel>,
    { userId, addressIndex }: EditUserAction
  ) {
    patchState({
      edit: { userId, addressIndex },
    });
  }
  @Action(ExitEditUserAction)
  ExitEditUser({ patchState }: StateContext<UsersTableStateModel>) {
    patchState({
      edit: { userId: null, addressIndex: null },
    });
  }

  @Action(UpdateUserAction)
  updateUser(
    { patchState, getState }: StateContext<UsersTableStateModel>,
    action: UpdateUserAction
  ) {
    return this.userService.updateUser(action.id, action.user);
  }

  @Action(SetDeleteUserInfoAction)
  deleteUserInfo(
    { patchState }: StateContext<UsersTableStateModel>,
    { userId, user }: SetDeleteUserInfoAction
  ) {
    patchState({
      deleteInfo: { userId, user },
    });
  }

  @Action(DeleteUserAction)
  deleteUser({
    patchState,
    getState,
    dispatch,
  }: StateContext<UsersTableStateModel>) {
    const { deleteInfo } = getState();
    return this.userService
      .deleteUser(deleteInfo.userId as number)
      .subscribe(() => {
        patchState({
          deleteInfo: { userId: null, user: null },
        });
        dispatch(new FilterUsersAction());
      });
  }

  @Action(DeleteUserAddressAction)
  deleteUserAddress({
    patchState,
    getState,
    dispatch,
  }: StateContext<UsersTableStateModel>) {
    const { deleteInfo } = getState();
    return this.userService
      .updateUser(deleteInfo.userId as number, deleteInfo.user as UserModel)
      .subscribe(() => {
        patchState({
          deleteInfo: { userId: null, user: null },
        });
        dispatch(new FilterUsersAction());
      });
  }

  @Action(DeleteUserDefaultAction)
  defaultDelete({ patchState }: StateContext<UsersTableStateModel>) {
    patchState({
      deleteInfo: { userId: null, user: null },
    });
  }

  @Action(ResetStateAction)
  resetState({ setState }: StateContext<UsersTableStateModel>) {
    setState({
      openUser: null,
      edit: { userId: null, addressIndex: null },
      deleteInfo: { userId: null, user: null },
    });
  }
}
