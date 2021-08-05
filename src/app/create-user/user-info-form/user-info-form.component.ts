import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CreateUserState } from '../../shared/states/create-user-state/create-user.state';
import { SetUserInfoAction } from '../../shared/states/create-user-state/create-user.actions';
import { UserInfoModel } from '../../shared/models/userInfoModel';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss'],
})
export class UserInfoFormComponent implements OnInit {
  mainInfo!: FormGroup;
  userInfo: UserInfoModel = {} as UserInfoModel;
  ngOnInit(): void {
    this.initMainInfoForm();
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  initMainInfoForm() {
    this.userInfo = this.store.selectSnapshot(CreateUserState.getUserInfo);
    this.mainInfo = this.fb.group(
      {
        firstName: [
          this.userInfo?.firstName,
          [Validators.required, Validators.minLength(3)],
        ],
        lastName: [
          this.userInfo?.lastName,
          [Validators.required, Validators.minLength(3)],
        ],
        userName: [
          this.userInfo?.userName,
          [Validators.required, Validators.minLength(3)],
        ],
        phone: [
          this.userInfo?.phone,
          [
            Validators.required,
            Validators.pattern(/[-+()0-9]/g),
            Validators.minLength(10),
            Validators.maxLength(17),
          ],
        ],
        email: [this.userInfo?.email, [Validators.required, Validators.email]],
        password: [
          this.userInfo?.password,
          [Validators.required, Validators.minLength(6)],
        ],
        confirmPassword: [this.userInfo?.confirmPassword, Validators.required],
      },
      { validators: this.mustMatch('password', 'confirmPassword') }
    );
  }

  private mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      matchingControl.setErrors(
        control.value === matchingControl.value ? null : { mismatch: true }
      );
    };
  }

  onSubmit() {
    if (!this.mainInfo.valid) {
      this.mainInfo.markAllAsTouched();
      return;
    }
    this.store
      .dispatch(new SetUserInfoAction(this.mainInfo.value))
      .subscribe(() => {
        this.router.navigate(['address'], { relativeTo: this.route });
      });
  }
}
