import { NgModule } from '@angular/core';
import { CreateUserComponent } from './create-user.component';
import { UserInfoFormComponent } from './user-info-form/user-info-form.component';
import { AddressInfoFormComponent } from './address-info-form/address-info-form.component';
import { ComponentsModule } from '../shared/modules/components.module';
import { CreateUserRoutingModule } from './create-user-routing.module';

@NgModule({
  declarations: [
    CreateUserComponent,
    UserInfoFormComponent,
    AddressInfoFormComponent,
  ],
  imports: [ComponentsModule, CreateUserRoutingModule],
  exports: [],
})
export class CreateUserModule {}
