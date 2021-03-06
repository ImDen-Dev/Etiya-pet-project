import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserInfoModel } from './user-info.model';
import { UserModel } from '../auth/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  foundUsers = new BehaviorSubject<UserInfoModel[]>([]);
  constructor(private http: HttpClient) {}

  findUsers(): Observable<UserInfoModel[]> {
    return this.http.get<UserInfoModel[]>(`http://localhost:3000/users`);
    /*      .pipe(
        map((response) => {
          return this.filterUsers(formValue, response);
        })
      )
      .subscribe((users) => {
        this.foundUsers.next(users);
      });*/
  }

  deleteUser(id: number) {
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }

  deleteUserAddress(id: number, body: UserInfoModel) {
    return this.http.patch(`http://localhost:3000/users/${id}`, body);
  }

  addUserAddress(id: number, body: UserInfoModel) {
    return this.http.put(`http://localhost:3000/users/${id}`, body);
  }

  /*filterUsers(value: any, response: any[]): UserInfoModel[] {
    Object.keys(value).forEach((key) => {
      if (value[key] === null) {
        delete value[key];
      }
    });
    if (Object.keys(value).length === 0) return response;
    return response.filter((user) =>
      Object.keys(value).every((key) =>
        user[key].toLowerCase().includes(value[key].toLowerCase())
      )
    );
  }*/
}
