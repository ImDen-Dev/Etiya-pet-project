import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserInfoModel } from '../models/user-info.model';
import { environment } from '../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${environment.dbUrl}/authenticate`,
      user
    );
  }

  createUser(user: UserInfoModel) {
    return this.http.post<UserInfoModel>(
      `${environment.dbUrl}/api/user/new`,
      user
    );
  }

  getUser(email: string) {
    return this.http.get<UserInfoModel>(
      `${environment.dbUrl}/api/user?email=${email}`
    );
  }

  getAllCountries(): Observable<{ name: string }[]> {
    return this.http.get<{ name: string }[]>(
      'https://restcountries.eu/rest/v2/all?fields=name'
    );
  }
}
