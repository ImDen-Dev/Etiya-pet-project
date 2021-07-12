import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FindUserComponent } from './search/find-user/find-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'find-user', component: FindUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
