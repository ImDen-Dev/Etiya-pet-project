import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SearchComponent } from './search/search.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FindUserComponent } from './search/find-user/find-user.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { UsersListComponent } from './search/find-user/users-list/users-list.component';

import { TableCollapseDirective } from './shared/directives/table-collapse.directive';

import { AuthState } from './shared/states/auth-state/auth.state';
import { UsersState } from './shared/states/users-state/users.state';

import { environment } from '../environments/environment';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { PaginationComponent } from './search/pagination/pagination.component';
import { SearchState } from './shared/states/search-state/search.state';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    SearchComponent,
    UserInfoComponent,
    FindUserComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UsersListComponent,
    TableCollapseDirective,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState, UsersState, SearchState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
