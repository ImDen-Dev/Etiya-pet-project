import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginAction } from '../../shared/states/auth-state/auth.actions';
import { AuthState } from '../../shared/states/auth-state/auth.state';
import { Subscription } from 'rxjs';
import {
  StartLoading,
  StopLoading,
} from '../../shared/states/ui-state/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    const isAuth = this.store.selectSnapshot(AuthState.isAuth);
    if (isAuth) this.router.navigate(['user-info']);
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;
    this.store.dispatch(new StartLoading());
    this.store.dispatch(new LoginAction(this.loginForm.value)).subscribe(
      () => {
        const isAuth = this.store.selectSnapshot(AuthState.isAuth);
        isAuth
          ? this.router.navigate(['user-info'])
          : this.router.navigate(['create-user']);
        this.store.dispatch(new StopLoading());
      },
      () => this.store.dispatch(new StopLoading())
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
