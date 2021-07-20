import { NgModule } from '@angular/core';
import { AtomInputWithLabelComponent } from '../components/atoms/atom-input-with-label/atom-input-with-label.component';
import { AtomInputErrorsComponent } from '../components/atoms/atom-input-errors/atom-input-errors.component';
import { SharedModule } from './shared.module';
import { UserInfoComponent } from '../../user-info/user-info.component';
import { AtomSelectWithLabelComponent } from '../components/atoms/atom-select-with-label/atom-select-with-label.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    AtomInputWithLabelComponent,
    AtomInputErrorsComponent,
    UserInfoComponent,
    AtomSelectWithLabelComponent,
  ],
  exports: [
    SharedModule,
    AtomInputWithLabelComponent,
    AtomInputErrorsComponent,
    UserInfoComponent,
    AtomSelectWithLabelComponent,
  ],
})
export class ComponentsModule {}
