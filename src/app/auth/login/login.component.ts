import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginAction } from '../auth-state/auth.actions';
import { switchMap } from 'rxjs/operators';
import { AuthState } from '../auth-state/auth.state';
import { Subscription } from 'rxjs';

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
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get getLoginForm() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    this.sub = this.store
      .dispatch(new LoginAction(this.loginForm.value))
      .subscribe(() => {
        const isAuth = this.store.selectSnapshot(AuthState.isAuth);
        isAuth
          ? this.router.navigate(['user-info'])
          : this.router.navigate(['sign-up']);
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
