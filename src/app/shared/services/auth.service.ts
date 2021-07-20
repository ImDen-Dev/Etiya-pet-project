import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserModel } from '../models/user.model';
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

  createUser(user: UserModel) {
    return this.http.post<UserModel>(`${environment.dbUrl}/api/user/new`, user);
  }

  getUser(email: string) {
    return this.http.get<UserModel>(
      `${environment.dbUrl}/api/user?email=${email}`
    );
  }

  getAllCountries(): Observable<{ name: string }[]> {
    return this.http.get<{ name: string }[]>(
      'https://restcountries.eu/rest/v2/all?fields=name'
    );
  }
}
