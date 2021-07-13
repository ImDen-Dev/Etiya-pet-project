import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserInfoModel } from '../../models/user-info.model';
import {
  ChangePageAction,
  ChangePageSizeAction,
  FilterUsersAction,
  TotalUsersCountAction,
} from './search.actions';
import { SearchService } from '../../services/search.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface SearchStateModel {
  pageNum: number;
  pageSize: number;
  sortBy: string | null;
  sortOrder: 'desc' | 'asc';
  searchRequest: string;
  totalCount: number;
  users: UserInfoModel[];
}

@State<SearchStateModel>({
  name: 'search',
  defaults: {
    pageNum: 0,
    pageSize: 5,
    sortBy: null,
    sortOrder: 'desc',
    searchRequest: '',
    totalCount: 0,
    users: [],
  },
})
@Injectable()
export class SearchState {
  constructor(private searchService: SearchService) {}
  @Selector()
  static getUsers({ users }: SearchStateModel): UserInfoModel[] {
    return users;
  }

  @Selector()
  static getTotalCount({ totalCount }: SearchStateModel): number {
    return totalCount;
  }

  @Action(FilterUsersAction)
  filterUsers(
    { patchState, getState, dispatch }: StateContext<SearchStateModel>,
    { payload }: FilterUsersAction
  ) {
    const state = getState();
    let newReq: string[] = [];
    Object.keys(payload).forEach(
      (key: any) =>
        payload[key] !== null &&
        newReq.push(`${key}:${payload[key].toLowerCase()}`)
    );
    return this.searchService
      .filterUsers(state.pageNum, state.pageSize, newReq.join())
      .pipe(
        tap((users) => {
          patchState({
            users: [...users],
            searchRequest: newReq.join(),
          });
        }),
        tap(() => dispatch(new TotalUsersCountAction()))
      );
  }

  @Action(ChangePageSizeAction)
  changePageSize(
    { patchState, getState, dispatch }: StateContext<SearchStateModel>,
    { size }: ChangePageSizeAction
  ) {
    const state = getState();
    return this.searchService
      .filterUsers(state.pageNum, size, state.searchRequest)
      .pipe(
        tap((users) => {
          patchState({
            pageSize: size,
            users: [...users],
          });
        }),
        tap(() => dispatch(new TotalUsersCountAction()))
      );
  }

  @Action(ChangePageAction)
  changePage(
    { patchState, getState, dispatch }: StateContext<SearchStateModel>,
    { pageNumber }: ChangePageAction
  ) {
    const state = getState();
    return this.searchService
      .filterUsers(pageNumber, state.pageSize, state.searchRequest)
      .pipe(
        tap((users) => {
          patchState({
            pageNum: pageNumber,
            users: [...users],
          });
        }),
        tap(() => dispatch(new TotalUsersCountAction()))
      );
  }

  @Action(TotalUsersCountAction)
  totalCount({ getState, patchState }: StateContext<SearchStateModel>) {
    const state = getState();
    return this.searchService.totalUsersCount(state.searchRequest).pipe(
      tap((count) => {
        patchState({
          totalCount: +count,
        });
      })
    );
  }
}
