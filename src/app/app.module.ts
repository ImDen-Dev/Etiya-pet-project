import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SearchComponent } from './search/search.component';
import { FindUserComponent } from './search/find-user/find-user.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { UsersListComponent } from './search/find-user/users-list/users-list.component';

import { TableCollapseDirective } from './shared/directives/table-collapse.directive';

import { AuthState } from './shared/states/auth-state/auth.state';
import { UsersTableState } from './shared/states/users-table-state/users-table.state';

import { environment } from '../environments/environment';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { PaginationComponent } from './search/pagination/pagination.component';
import { SearchState } from './shared/states/search-state/search.state';
import { SpinnerComponent } from './shared/components/atoms/atomSpinner/spinner.component';
import { UiState } from './shared/states/ui-state/ui.state';
import { CreateUserState } from './shared/states/create-user-state/create-user.state';
import { ComponentsModule } from './shared/modules/components.module';
import { MoleculeTableColComponent } from './shared/components/molecules/molecule-table-col/molecule-table-col.component';
import { AtomTableHeadLabelComponent } from './shared/components/atoms/atom-table-head-label/atom-table-head-label.component';
import { OrganismTableRowComponent } from './shared/components/organism/organism-table-row/organism-table-row.component';
import { AlertModalComponent } from './shared/modals/alert-modal/alert-modal.component';
import { MoleculeTableSelectColComponent } from './shared/components/molecules/molecule-table-select-col/molecule-table-select-col.component';
import { TaxCalculatorComponent } from './tax-calculator/tax-calculator.component';
import { TaxCalculatorState } from './shared/states/tax-state/tax-calculator.state';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    FindUserComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UsersListComponent,
    TableCollapseDirective,
    PaginationComponent,
    SpinnerComponent,
    MoleculeTableColComponent,
    MoleculeTableSelectColComponent,
    AtomTableHeadLabelComponent,
    OrganismTableRowComponent,
    AlertModalComponent,
    TaxCalculatorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgxsModule.forRoot(
      [
        AuthState,
        UsersTableState,
        CreateUserState,
        SearchState,
        UiState,
        TaxCalculatorState,
      ],
      {
        developmentMode: !environment.production,
      }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
