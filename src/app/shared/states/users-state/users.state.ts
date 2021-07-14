import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserInfoModel } from '../../models/user-info.model';
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
} from './users.actions';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs/operators';
import { FilterUsersAction } from '../search-state/search.actions';

export interface UsersStateModel {
  openUser: number | null;
  edit: {
    userId: number | null;
    addressIndex: number | null;
  };
  deleteInfo: { userId: number | null; user: UserInfoModel | null };
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    openUser: null,
    edit: { userId: null, addressIndex: null },
    deleteInfo: { userId: null, user: null },
  },
})
@Injectable()
export class UsersState {
  constructor(private userService: UserService) {}

  @Selector()
  static getOpenUser({ openUser }: UsersStateModel): number | null {
    return openUser;
  }

  @Selector()
  static edit({ edit }: UsersStateModel): {
    userId: number | null;
    addressIndex: number | null;
  } {
    return edit;
  }

  @Selector()
  static deleteInfo({ deleteInfo }: UsersStateModel): {
    userId: number | null;
    user: UserInfoModel | null;
  } {
    return deleteInfo;
  }

  @Action(OpenUserAction)
  openUser(
    { patchState, getState }: StateContext<UsersStateModel>,
    { userId }: OpenUserAction
  ) {
    patchState({
      openUser: getState().openUser === userId ? null : userId,
    });
  }

  @Action(EditUserAction)
  editUser(
    { patchState, getState }: StateContext<UsersStateModel>,
    { userId, addressIndex }: EditUserAction
  ) {
    patchState({
      edit: { userId, addressIndex },
    });
  }
  @Action(ExitEditUserAction)
  ExitEditUser({ patchState }: StateContext<UsersStateModel>) {
    patchState({
      edit: { userId: null, addressIndex: null },
    });
  }

  @Action(UpdateUserAction)
  updateUser(
    { patchState, getState }: StateContext<UsersStateModel>,
    action: UpdateUserAction
  ) {
    return this.userService.updateUser(action.id, action.user);
  }

  @Action(SetDeleteUserInfoAction)
  deleteUserInfo(
    { patchState }: StateContext<UsersStateModel>,
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
  }: StateContext<UsersStateModel>) {
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
  }: StateContext<UsersStateModel>) {
    const { deleteInfo } = getState();
    return this.userService
      .updateUser(deleteInfo.userId as number, deleteInfo.user as UserInfoModel)
      .subscribe(() => {
        patchState({
          deleteInfo: { userId: null, user: null },
        });
        dispatch(new FilterUsersAction());
      });
  }

  @Action(DeleteUserDefaultAction)
  defaultDelete({ patchState }: StateContext<UsersStateModel>) {
    patchState({
      deleteInfo: { userId: null, user: null },
    });
  }

  @Action(ResetStateAction)
  resetState({ setState }: StateContext<UsersStateModel>) {
    setState({
      openUser: null,
      edit: { userId: null, addressIndex: null },
      deleteInfo: { userId: null, user: null },
    });
  }
}
