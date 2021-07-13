import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ChangePageAction,
  ChangePageSizeAction,
} from '../../shared/states/search-state/search.actions';
import { Observable } from 'rxjs';
import { SearchState } from '../../shared/states/search-state/search.state';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  indent = 3;
  currentPage = 0;
  pageSize = 5;
  countPages!: number[];
  totalUsersCount!: number;

  @Select(SearchState.getTotalCount) totalCount$!: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.totalCount$.subscribe((count) => {
      this.totalUsersCount = count;
      this.pagesCount();
    });
  }

  pagesCount() {
    this.countPages = new Array(
      Math.ceil(this.totalUsersCount / this.pageSize)
    );
    if (this.currentPage > this.countPages.length - 1) {
      this.currentPage =
        this.countPages.length === 0
          ? this.countPages.length
          : this.countPages.length - 1;
    }
    this.store
      .dispatch(new ChangePageAction(this.currentPage))
      .subscribe(() => {
        this.store.dispatch(new ChangePageSizeAction(this.pageSize));
      });
  }

  onChangePageSize(event: MouseEvent) {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.pagesCount();
  }

  onNextPrev(isNext: boolean) {
    isNext ? this.currentPage++ : this.currentPage--;
    this.store.dispatch(new ChangePageAction(this.currentPage));
  }

  onChangePage(page: number) {
    this.currentPage = page;
    this.store.dispatch(new ChangePageAction(this.currentPage));
  }
}
