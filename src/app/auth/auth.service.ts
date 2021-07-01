import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { AddressModel } from './address.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserInfoModel } from '../shared/user-info.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuth = new BehaviorSubject<boolean>(false);
  private user!: UserInfoModel | null;

  constructor(private http: HttpClient) {}

  login(user: { email: string; password: string }) {
    return this.http.get<UserInfoModel[]>(
      `http://localhost:3000/users?email=${user.email}&password=${user.password}`
    );
  }

  logout() {
    this.isAuth.next(false);
    this.setUser(null);
  }

  createUser(user: UserInfoModel) {
    return this.http.post<UserInfoModel>('http://localhost:3000/users', user);
  }

  getAllCountries(): Observable<{ name: string }[]> {
    return this.http.get<{ name: string }[]>(
      'https://restcountries.eu/rest/v2/all?fields=name'
    );
  }

  setUser(user: UserInfoModel | null) {
    this.user = user;
  }

  getUser(): UserInfoModel {
    return <UserInfoModel>this.user;
  }
}
