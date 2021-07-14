import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserInfoModel } from '../../models/user-info.model';
import {
  ChangePageAction,
  ChangePageSizeAction,
  FilterUsersAction,
  SetRequestAction,
  SortAction,
  TotalUsersCountAction,
} from './search.actions';
import { SearchService } from '../../services/search.service';
import { tap } from 'rxjs/operators';

export interface InfoModel {
  pageNum: number;
  pageSize: number;
  indent: number;
  sortBy: string;
  sortOrder: string;
  totalCount: number;
}

export interface SearchStateModel extends InfoModel {
  searchRequest: string;
  users: UserInfoModel[];
}

@State<SearchStateModel>({
  name: 'search',
  defaults: {
    pageNum: 0,
    pageSize: 5,
    sortBy: '',
    sortOrder: 'desc',
    searchRequest: '',
    indent: 3,
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
  static getInfo({
    pageNum,
    pageSize,
    indent,
    sortBy,
    sortOrder,
    totalCount,
  }: SearchStateModel): InfoModel {
    return { pageNum, pageSize, indent, sortBy, sortOrder, totalCount };
  }

  @Action(FilterUsersAction)
  filterUsers({ patchState, getState }: StateContext<SearchStateModel>) {
    const state = getState();
    return this.searchService
      .filterUsers(
        state.pageNum,
        state.pageSize,
        state.searchRequest,
        state.sortBy,
        state.sortOrder
      )
      .pipe(
        tap((users) => {
          patchState({
            users: [...users],
          });
        })
      );
  }

  @Action(SetRequestAction)
  setRequest(
    { patchState, dispatch }: StateContext<SearchStateModel>,
    { payload }: SetRequestAction
  ) {
    let newReq: string[] = [];
    Object.keys(payload).forEach(
      (key: any) =>
        payload[key] !== null &&
        newReq.push(`${key}:${payload[key].toLowerCase()}`)
    );
    patchState({
      pageNum: 0,
      searchRequest: `search=${newReq.join()}`,
    });
    dispatch(new FilterUsersAction());
    dispatch(new TotalUsersCountAction());
  }

  @Action(ChangePageSizeAction)
  changePageSize(
    { patchState, dispatch }: StateContext<SearchStateModel>,
    { size }: ChangePageSizeAction
  ) {
    patchState({
      pageSize: size,
    });
    dispatch(new FilterUsersAction());
  }

  @Action(ChangePageAction)
  changePage(
    { patchState, getState, dispatch }: StateContext<SearchStateModel>,
    { pageNumber }: ChangePageAction
  ) {
    patchState({
      pageNum: pageNumber,
    });
    dispatch(new FilterUsersAction());
  }

  @Action(SortAction)
  sort(
    { patchState, dispatch }: StateContext<SearchStateModel>,
    { payload }: SortAction
  ) {
    patchState({
      sortOrder: payload.sortOrder,
      sortBy: payload.sortBy,
    });
    dispatch(new FilterUsersAction());
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
