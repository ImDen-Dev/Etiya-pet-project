import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { AuthState } from '../../shared/states/auth-state/auth.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginAction } from '../../shared/states/auth-state/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let validLoginUser = {
    email: 'user@user.com',
    password: '123456',
  };
  let emptyEmailLoginUser = {
    email: '',
    password: '123456',
  };
  let emptyPasswordLoginUser = {
    email: 'user@user.com',
    password: '',
  };
  let invalidEmailLoginUser = {
    email: 'userusercom',
    password: '123456',
  };
  let store: Store;
  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgxsModule.forRoot([AuthState]),
        HttpClientTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();
    store = TestBed.inject(Store);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should return valid controls', () => {
    const controls = component.getLoginForm;
    expect(controls.email).toBeTruthy();
    expect(controls.password).toBeTruthy();
  });

  it('email field validity', () => {
    let emailErrors;

    const email = component.getLoginForm.email;
    expect(email.valid).toBeFalsy('Invalid form at start');

    email.setValue(emptyEmailLoginUser.email);
    emailErrors = email.errors || {};
    expect(emailErrors['required']).toBeTruthy();
    expect(emailErrors['email']).toBeFalsy();

    email.setValue(invalidEmailLoginUser.email);
    emailErrors = email.errors || {};
    expect(emailErrors['required']).toBeFalsy();
    expect(emailErrors['email']).toBeTruthy();

    email.setValue(validLoginUser.email);
    emailErrors = email.errors || {};
    expect(emailErrors['required']).toBeFalsy();
    expect(emailErrors['email']).toBeFalsy();
  });

  it('password field validity', () => {
    let passwordErrors;

    const password = component.getLoginForm.password;
    expect(password.valid).toBeFalsy();

    password.setValue(emptyPasswordLoginUser.password);
    passwordErrors = password.errors || {};
    expect(passwordErrors['required']).toBeTruthy();

    password.setValue(validLoginUser.password);
    passwordErrors = password.errors || {};
    expect(passwordErrors['required']).toBeFalsy();
  });

  it('should be', () => {
    component.onSubmit();
    store.dispatch(new LoginAction({ email: '', password: '' }));
    fixture.detectChanges();

    console.log((router.navigate as jasmine.Spy).calls);
  });
});
