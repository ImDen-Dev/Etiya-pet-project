import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfoFormComponent } from './user-info-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/modules/shared.module';
import { AtomInputWithLabelComponent } from '../../shared/components/atoms/atom-input-with-label/atom-input-with-label.component';
import { UserInfoModel } from '../../shared/models/userInfoModel';
import { CreateUserState } from '../../shared/states/create-user-state/create-user.state';
import { By } from '@angular/platform-browser';
import { SetUserInfoAction } from '../../shared/states/create-user-state/create-user.actions';
import { of } from 'rxjs';

describe('UserInfoFormComponent', () => {
  let component: UserInfoFormComponent;
  let fixture: ComponentFixture<UserInfoFormComponent>;

  let router: { navigate: jasmine.Spy };
  let store: { dispatch: jasmine.Spy; selectSnapshot: jasmine.Spy };
  let activatedRoute: ActivatedRoute;

  const userFullInfoMock: UserInfoModel = {
    firstName: 'sgfdsgfdg',
    lastName: 'sfgdsdfgsd',
    userName: 'gfsdfgsdfg',
    phone: '5234523452345',
    email: 'asdfgasd@dasdf',
    password: '123456',
    confirmPassword: '123456',
  };

  const userEmptyInfoMock = {
    firstName: null,
    lastName: null,
    userName: null,
    phone: null,
    email: null,
    password: null,
    confirmPassword: null,
  };

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    store = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);

    await TestBed.configureTestingModule({
      declarations: [UserInfoFormComponent, AtomInputWithLabelComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'address', component: UserInfoFormComponent },
        ]),
        SharedModule,
      ],
      providers: [
        { provide: Store, useValue: store },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(UserInfoFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
    fixture.detectChanges();
    expect(component.mainInfo).toBeTruthy();
  });

  it('should init filled form', () => {
    store.selectSnapshot.and.returnValue(userFullInfoMock);
    fixture.detectChanges();
    expect(store.selectSnapshot).toHaveBeenCalledWith(
      CreateUserState.getUserInfo
    );
    expect(component.mainInfo.value).toEqual(userFullInfoMock);
  });

  it('should init empty form', () => {
    store.selectSnapshot.and.returnValue({});
    fixture.detectChanges();
    expect(store.selectSnapshot).toHaveBeenCalledWith(
      CreateUserState.getUserInfo
    );
    expect(component.mainInfo.value).toEqual(userEmptyInfoMock);
  });

  it('mustMatch should work correctly', () => {
    fixture.detectChanges();
    const form = component.mainInfo.controls;
    form.password.setValue('123456');
    form.confirmPassword.setValue('123456');
    expect(form.confirmPassword.errors).toBeNull();

    form.password.setValue('123456');
    form.confirmPassword.setValue('123457');
    expect(form.confirmPassword.errors).toEqual({ mismatch: true });
  });

  it('should not submit form', () => {
    fixture.detectChanges();
    const submitBtn: HTMLButtonElement = fixture.debugElement.query(
      By.css('button[type=submit]')
    ).nativeElement;

    expect(component.mainInfo.touched).toBeFalsy();

    submitBtn.click();

    expect(component.mainInfo.touched).toBeTruthy();
  });

  it('should submit form', () => {
    const submitBtn: HTMLButtonElement = fixture.debugElement.query(
      By.css('button[type=submit]')
    ).nativeElement;
    store.dispatch.and.returnValue(of(true));
    router.navigate.and.callThrough();
    const onSubmitSpy = spyOn(component, 'onSubmit').and.callThrough();

    fixture.detectChanges();
    component.mainInfo.patchValue(userFullInfoMock);

    submitBtn.click();
    expect(onSubmitSpy).toHaveBeenCalled();

    expect(store.dispatch).toHaveBeenCalledWith(
      new SetUserInfoAction(component.mainInfo.value)
    );
    expect(router.navigate).toHaveBeenCalledWith(['address'], {
      relativeTo: activatedRoute,
    });
  });
});
