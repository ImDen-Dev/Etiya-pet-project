import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { AddressModel } from './address.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuth = new BehaviorSubject<boolean>(false);
  private user!: (UserModel & AddressModel[]) | null;

  constructor(private http: HttpClient) {}

  login(user: { email: string; password: string }) {
    return this.http.get<[UserModel & AddressModel[]]>(
      `http://localhost:3000/users?email=${user.email}&password=${user.password}`
    );
  }

  logout() {
    this.isAuth.next(false);
    this.setUser(null);
  }

  createUser(user: UserModel & AddressModel[]) {
    return this.http.post('http://localhost:3000/users', user);
  }

  getAllCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/all?fields=name');
  }

  setUser(user: (UserModel & AddressModel[]) | null) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
