import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FindUserComponent } from './search/find-user/find-user.component';
import { TaxCalculatorComponent } from './tax-calculator/tax-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'create-user',
    loadChildren: () =>
      import('./create-user/create-user.module').then(
        (m) => m.CreateUserModule
      ),
  },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'find-user', component: FindUserComponent },
  { path: 'tax', component: TaxCalculatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
