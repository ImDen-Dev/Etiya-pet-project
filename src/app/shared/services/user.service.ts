import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  foundUsers = new BehaviorSubject<UserModel[]>([]);
  constructor(private http: HttpClient) {}

  findUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.dbUrl}/api/user/all`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.dbUrl}/api/user/${id}`);
  }

  updateUser(id: number, body: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(
      `${environment.dbUrl}/api/user/${id}`,
      body
    );
  }
}
