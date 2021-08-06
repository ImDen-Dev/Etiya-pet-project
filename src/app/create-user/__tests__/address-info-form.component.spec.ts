import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInfoFormComponent } from '../address-info-form/address-info-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { SharedModule } from '../../shared/modules/shared.module';
import { AtomInputWithLabelComponent } from '../../shared/components/atoms/atom-input-with-label/atom-input-with-label.component';
import { AtomSelectWithLabelComponent } from '../../shared/components/atoms/atom-select-with-label/atom-select-with-label.component';
import { CreateUserState } from '../../shared/states/create-user-state/create-user.state';
import { UserService } from '../../shared/services/user.service';
import { AddressModel } from '../../shared/models/address.model';
import { By } from '@angular/platform-browser';
import { SetAddressInfoAction } from '../../shared/states/create-user-state/create-user.actions';

describe('AddressInfoFormComponent', () => {
  let component: AddressInfoFormComponent;
  let fixture: ComponentFixture<AddressInfoFormComponent>;

  let router: { navigate: jasmine.Spy };
  let storeSpy: { dispatch: jasmine.Spy; selectSnapshot: jasmine.Spy };
  let userService: { getAllCountries: jasmine.Spy };

  const userAddressMock: AddressModel[] = [
    {
      addressType: 'Home Address',
      address: 'fgdsfdg',
      city: 'sfdgsdfg',
      country: 'Bahrain',
      postalCode: 234523452345,
    },
    {
      addressType: 'Home Address',
      address: 'sfdgfdsgf',
      city: 'ebvbv',
      country: 'Australia',
      postalCode: 6534653456,
    },
  ];

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    storeSpy = jasmine.createSpyObj('Store', [
      'dispatch',
      'selectSnapshot',
      'select',
    ]);
    userService = jasmine.createSpyObj('UserService', ['getAllCountries']);
    await TestBed.configureTestingModule({
      declarations: [
        AddressInfoFormComponent,
        AtomInputWithLabelComponent,
        AtomSelectWithLabelComponent,
      ],
      imports: [
        SharedModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([CreateUserState]),
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: Store, useValue: storeSpy },
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInfoFormComponent);
    component = fixture.componentInstance;
    storeSpy.selectSnapshot.and.returnValue(userAddressMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
    expect(component.addressInfo).toBeTruthy();
  });

  it('form should init all user addresses', () => {
    expect(storeSpy.selectSnapshot).toHaveBeenCalledWith(
      CreateUserState.getUserAddressInfo
    );
    const formArrayLength =
      component.addressInfo.controls.userAddress.value.length;
    expect(formArrayLength).toBe(userAddressMock.length);
  });

  it('should add address to form', () => {
    component.addAddressGroup(userAddressMock[0]);
    const formValue = component.addressInfo.controls.userAddress.value;
    expect(formValue).toEqual([...userAddressMock, userAddressMock[0]]);
  });

  it('should remove address from the form', () => {
    component.deleteAddressControl(1);
    const formValue = component.addressInfo.controls.userAddress.value;
    expect(formValue[0]).toEqual(userAddressMock[0]);
  });

  it('onSubmit should return true if form invalid', () => {
    component.addressInfo.reset();
    const res = component.onSubmit();
    expect(res).toBe(true);
  });

  it('onSubmit should return false and dispatch if form valid', () => {
    storeSpy.dispatch.and.returnValue(true);
    const onSubmitRes = component.onSubmit();
    expect(onSubmitRes).toBeFalsy();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      new SetAddressInfoAction(component.getAddressInfoArray.value)
    );
  });

  it('should navigate to ["/create-user"] on click prev. button', () => {
    const prevBtn: HTMLButtonElement = fixture.debugElement.queryAll(
      By.css('button[type=button]')
    )[1].nativeElement;
    prevBtn.click();
    expect(router.navigate).toHaveBeenCalledWith(['/create-user']);
  });

  it('should navigate to ["/create-user/summary"] on click next button', () => {
    const prevBtn: HTMLButtonElement = fixture.debugElement.queryAll(
      By.css('button[type=button]')
    )[2].nativeElement;
    prevBtn.click();
    expect(router.navigate).toHaveBeenCalledWith(['/create-user/summary']);
  });
});
