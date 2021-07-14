import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ChangePageAction,
  ChangePageSizeAction,
} from '../../shared/states/search-state/search.actions';
import { Observable } from 'rxjs';
import {
  InfoModel,
  SearchState,
} from '../../shared/states/search-state/search.state';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  indent!: number;
  currentPage!: number;
  pageSize!: number;
  countPages!: number[];
  sortBy!: string | null;
  sortOrder!: string;
  totalUsersCount!: number;

  @Select(SearchState.getInfo) info$!: Observable<InfoModel>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.info$.subscribe(
      ({ indent, totalCount, pageSize, pageNum, sortBy, sortOrder }) => {
        this.totalUsersCount = totalCount;
        this.currentPage = pageNum;
        this.pageSize = pageSize;
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
        this.indent = indent;
        this.pagesCount();
      }
    );
  }

  pagesCount() {
    this.countPages = new Array(
      Math.ceil(this.totalUsersCount / this.pageSize)
    );
  }

  onChangePageSize(event: MouseEvent) {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.pagesCount();
    this.store
      .dispatch(new ChangePageSizeAction(this.pageSize))
      .subscribe(() => {
        this.currentPage = 0;
        this.store.dispatch(new ChangePageAction(this.currentPage));
      });
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
