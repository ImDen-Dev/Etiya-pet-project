import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserInfoModel } from '../../shared/user-info.model';
import { Injectable } from '@angular/core';
import {
  SetDeleteUserInfoAction,
  EditUserAction,
  ExitEditUserAction,
  FindUsersAction,
  OpenUserAction,
  UpdateUserAction,
  DeleteUserAction,
  DeleteUserAddressAction,
  DeleteUserDefaultAction,
  ResetStateAction,
} from './users.actions';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/user.service';
import { map, tap } from 'rxjs/operators';

export interface UsersStateModel {
  users: UserInfoModel[];
  openUser: number | null;
  edit: {
    user: UserInfoModel | null;
    userId: number | null;
    addressIndex: number | null;
  };
  deleteInfo: { userId: number | null; user: UserInfoModel | null };
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: [],
    openUser: null,
    edit: { user: null, userId: null, addressIndex: null },
    deleteInfo: { userId: null, user: null },
  },
})
@Injectable()
export class UsersState {
  constructor(private userService: UserService) {}
  @Selector()
  static getUsers({ users }: UsersStateModel): UserInfoModel[] {
    return users;
  }

  @Selector()
  static getOpenUser({ openUser }: UsersStateModel): number | null {
    return openUser;
  }

  @Selector()
  static edit({ edit }: UsersStateModel): {
    user: UserInfoModel | null;
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

  @Action(FindUsersAction)
  setUsers(
    { getState, patchState }: StateContext<UsersStateModel>,
    action: FindUsersAction
  ): Observable<UserInfoModel[]> {
    return this.userService.findUsers().pipe(
      map((response) => this.filterUsers(action.payload, response)),
      tap((users) => {
        patchState({
          users: [...users],
        });
      })
    );
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
    const editUser = getState().users.filter((user) => user.id === userId);
    patchState({
      edit: { user: { ...editUser[0] }, userId, addressIndex },
    });
  }
  @Action(ExitEditUserAction)
  ExitEditUser({ patchState }: StateContext<UsersStateModel>) {
    patchState({
      edit: { user: null, userId: null, addressIndex: null },
    });
  }

  @Action(UpdateUserAction)
  updateUser(
    { patchState, getState }: StateContext<UsersStateModel>,
    action: UpdateUserAction
  ) {
    return this.userService.updateUser(action.id, action.user).pipe(
      tap((value) => {
        const updatesUsers = [...getState().users];
        const userIndex = updatesUsers.findIndex(
          (user) => user.id === action.id
        );
        updatesUsers[userIndex] = {
          ...updatesUsers[userIndex],
          ...action.user,
        };
        patchState({
          users: [...updatesUsers],
        });
      })
    );
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
  deleteUser({ patchState, getState }: StateContext<UsersStateModel>) {
    const { users, deleteInfo } = getState();
    const updateUsers = users.filter((user) => user.id !== deleteInfo.userId);
    return this.userService
      .deleteUser(deleteInfo.userId as number)
      .subscribe(() => {
        patchState({
          users: [...updateUsers],
          deleteInfo: { userId: null, user: null },
        });
      });
  }

  @Action(DeleteUserAddressAction)
  deleteUserAddress({ patchState, getState }: StateContext<UsersStateModel>) {
    const { users, deleteInfo } = getState();
    const userIndex = users.findIndex((user) => user.id === deleteInfo.userId);
    const updatedUser = { ...users[userIndex], ...deleteInfo.user };
    const updatedUsers = [...users];
    updatedUsers[userIndex] = updatedUser;
    console.log(deleteInfo);
    return this.userService
      .deleteUserAddress(
        deleteInfo.userId as number,
        deleteInfo.user as UserInfoModel
      )
      .subscribe(() => {
        patchState({
          users: [...updatedUsers],
          deleteInfo: { userId: null, user: null },
        });
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
      users: [],
      openUser: null,
      edit: { user: null, userId: null, addressIndex: null },
      deleteInfo: { userId: null, user: null },
    });
  }

  private filterUsers(value: any, response: any[]): UserInfoModel[] {
    Object.keys(value).forEach((key) => {
      if (value[key] === null) {
        delete value[key];
      }
    });
    if (Object.keys(value).length === 0) return response;
    return response.filter((user) =>
      Object.keys(value).every((key) =>
        user[key].toLowerCase().includes(value[key].toLowerCase())
      )
    );
  }
}
