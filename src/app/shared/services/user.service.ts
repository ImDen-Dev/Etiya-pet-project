import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  // TODO Fix
  // findUsers(): Observable<UserModel[]> {
  //   return this.http.get<UserModel[]>(`${environment.dbUrl}/api/user/all`);
  // }

  deleteUser(id: number) {
    return this.http.delete(`${environment.dbUrl}/api/user/${id}`);
  }

  updateUser(id: number, body: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(
      `${environment.dbUrl}/api/user/${id}`,
      body
    );
  }

  createUser(user: UserModel) {
    return this.http.post<UserModel>(`${environment.dbUrl}/api/user/new`, user);
  }

  getAllCountries(): Observable<{ name: string }[]> {
    return this.http.get<{ name: string }[]>(`${environment.countriesUrl}`);
  }
}
