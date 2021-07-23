import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { UserModel } from '../models/user.model';
import { environment } from '../../../environments/environment';

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

  getUser(email: string) {
    return this.http.get<UserModel>(
      `${environment.dbUrl}/api/user?email=${email}`
    );
  }
}
