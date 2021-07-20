import { SearchModel } from '../models/search.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  filterUsers(
    pageNum: number,
    pageSize: number,
    searchParam: string,
    sortBy: string,
    sortOrder: string
  ): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(
      `${environment.dbUrl}/api/user/all?pageNum=${pageNum}&sortBy=${sortBy}&sortOrder=${sortOrder}&pageSize=${pageSize}&${searchParam}`
    );
  }

  totalUsersCount(params: string) {
    return this.http.get(`${environment.dbUrl}/api/user/count?${params}`);
  }
}
