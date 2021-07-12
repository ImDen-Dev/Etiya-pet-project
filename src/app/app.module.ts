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
import { MainComponent } from './users-list/main.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FindUserComponent } from './users-list/find-user/find-user.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { UsersListComponent } from './users-list/find-user/users-list/users-list.component';

import { TableCollapseDirective } from './shared/directives/table-collapse.directive';

import { AuthState } from './auth/auth-state/auth.state';
import { UsersState } from './users-list/users-state/users.state';

import { environment } from '../environments/environment';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    MainComponent,
    UserInfoComponent,
    FindUserComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UsersListComponent,
    TableCollapseDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState, UsersState], {
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
