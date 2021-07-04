import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserInfoModel } from '../../shared/user-info.model';
import { Injectable } from '@angular/core';
import {
  EditUserAction,
  ExitEditUserAction,
  FindUsersAction,
  OpenUserAction,
  UpdateUserAction,
} from './users.actions';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/user.service';
import { map, tap } from 'rxjs/operators';

export interface UsersStateModel {
  users: UserInfoModel[];
  openUser: number | null;
  edit: { userId: number | null; addressIndex: number | null };
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: [],
    openUser: null,
    edit: { userId: null, addressIndex: null },
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
    userId: number | null;
    addressIndex: number | null;
  } {
    return edit;
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
    { patchState }: StateContext<UsersStateModel>,
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
