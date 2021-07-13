import { SearchModel } from '../models/search.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfoModel } from '../models/user-info.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  filterUsers(
    pageNum: number,
    pageSize: number,
    searchParam: string
  ): Observable<UserInfoModel[]> {
    return this.http.get<UserInfoModel[]>(
      `${environment.dbUrl}/api/user/all?pageNum=${pageNum}&pageSize=${pageSize}&search=${searchParam}`
    );
  }

  totalUsersCount(params: string) {
    return this.http.get(
      `${environment.dbUrl}/api/user/count?search=${params}`
    );
  }
}