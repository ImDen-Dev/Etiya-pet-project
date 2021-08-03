import { LoginComponent } from '../login/login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SharedModule } from '../../shared/modules/shared.module';
import { AtomInputWithLabelComponent } from '../../shared/components/atoms/atom-input-with-label/atom-input-with-label.component';
import { By } from '@angular/platform-browser';
import { defer, of } from 'rxjs';
import { AuthState } from '../../shared/states/auth-state/auth.state';
import { LoginAction } from '../../shared/states/auth-state/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: { navigate: jasmine.Spy };
  let store: { dispatch: jasmine.Spy; selectSnapshot: jasmine.Spy };

  let loginForm: FormGroup;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitBtn: HTMLButtonElement;

  const validLoginFormValues = {
    email: 'test@test',
    password: 'tester',
  };

  const invalidLoginFormsValues = {
    email: 'testtest',
    password: 'test',
  };

  const setFormValue = () => {
    emailInput.value = validLoginFormValues.email;
    passwordInput.value = validLoginFormValues.password;
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
  };

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    store = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent, AtomInputWithLabelComponent],
      imports: [ReactiveFormsModule, SharedModule],
      providers: [
        { provide: Router, useValue: router },
        { provide: Store, useValue: store },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store.selectSnapshot.and.returnValue(true);
    fixture.detectChanges();
  });

  beforeEach(() => {
    loginForm = component.loginForm;
    emailInput = fixture.debugElement.query(
      By.css('input[type=email]')
    ).nativeElement;
    passwordInput = fixture.debugElement.query(
      By.css('input[type=password]')
    ).nativeElement;
    submitBtn = fixture.debugElement.query(
      By.css('button[type=submit]')
    ).nativeElement;
  });

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('onInit should navigate to "user-info" if auth', () => {
    // store.selectSnapshot.and.returnValue(true);

    // expect(spyOn(component, 'ngOnInit')).toHaveBeenCalled();
    expect(store.selectSnapshot).toHaveBeenCalledWith(AuthState.isAuth);
    expect(store.selectSnapshot.calls.count()).toBe(1);
    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate.calls.count()).toBe(1);
    expect(router.navigate).toHaveBeenCalledWith(['user-info']);
  });

  it('should init form correctly', () => {
    const loginFormValue = {
      email: null,
      password: null,
    };
    expect(loginForm.value).toEqual(loginFormValue);
  });

  it('should set value correctly', () => {
    emailInput.value = invalidLoginFormsValues.email;
    passwordInput.value = invalidLoginFormsValues.password;
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    expect(loginForm.valid).toBeFalsy();

    emailInput.value = validLoginFormValues.email;
    passwordInput.value = validLoginFormValues.password;
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    expect(loginForm.valid).toBeTruthy();
    expect(loginForm.value).toEqual(validLoginFormValues);
  });

  it('should not submit if form invalid', () => {
    submitBtn.click();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('on Submit should navigate to "user-info" if auth success', () => {
    store.dispatch.and.returnValue(of(() => {}));
    store.selectSnapshot.and.returnValue(true);
    setFormValue();

    submitBtn.click();

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new LoginAction(loginForm.value)
    );
    expect(store.selectSnapshot).toHaveBeenCalled();
    expect(store.selectSnapshot).toHaveBeenCalledWith(AuthState.isAuth);
    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['user-info']);
  });

  it('on Submit should navigate to "user-info" if auth invalid', () => {
    store.dispatch.and.returnValue(of(() => {}));
    store.selectSnapshot.and.returnValue(false);
    setFormValue();

    submitBtn.click();
    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['create-user']);
  });
});
