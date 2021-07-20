import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { AddressInfoFormComponent } from './address-info-form/address-info-form.component';
import { UserInfoFormComponent } from './user-info-form/user-info-form.component';

const routes: Routes = [
  {
    path: '',
    component: CreateUserComponent,
    children: [
      {
        path: '',
        component: UserInfoFormComponent,
        data: { animation: 'UserInfoForm' },
      },
      {
        path: 'address',
        component: AddressInfoFormComponent,
        data: { animation: 'AddressForm' },
      },
      {
        path: 'summary',
        component: UserInfoComponent,
        data: { animation: 'UserInfo' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUserRoutingModule {}
