import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../../auth/auth-state/auth.state';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.store.selectSnapshot(AuthState.getUserToken);
    if (
      !request.url.includes(
        'https://restcountries.eu/rest/v2/all?fields=name'
      ) &&
      !request.url.includes(`${environment.dbUrl}/api/user/new`)
    ) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', authToken),
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
