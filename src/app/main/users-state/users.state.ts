import { Action, State, StateContext } from '@ngxs/store';
import { UserInfoModel } from '../../shared/user-info.model';
import { Injectable } from '@angular/core';
import { FindUsersAction } from './users.actions';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/user.service';
import { map, tap } from 'rxjs/operators';

export interface UsersStateModel {
  users: UserInfoModel[];
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: [],
  },
})
@Injectable()
export class UsersState {
  constructor(private userService: UserService) {}

  @Action(FindUsersAction)
  getUsers(
    { patchState }: StateContext<UsersStateModel>,
    action: FindUsersAction
  ): Observable<UserInfoModel[]> {
    return this.userService.findUsers().pipe(
      map((response) => this.filterUsers(action.payload, response)),
      tap((users) => {
        patchState({
          users: { ...users },
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
