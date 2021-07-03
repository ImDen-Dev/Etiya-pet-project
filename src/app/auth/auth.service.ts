import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserInfoModel } from '../shared/user-info.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: { email: string; password: string }) {
    return this.http.get<UserInfoModel[]>(
      `http://localhost:3000/users?email=${user.email}&password=${user.password}`
    );
  }

  createUser(user: UserInfoModel) {
    return this.http.post<UserInfoModel>('http://localhost:3000/users', user);
  }

  getAllCountries(): Observable<{ name: string }[]> {
    return this.http.get<{ name: string }[]>(
      'https://restcountries.eu/rest/v2/all?fields=name'
    );
  }
}
