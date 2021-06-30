import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../user.model';
import { AuthService } from '../auth.service';
import { AddressModel } from '../address.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  page = 'mainInfo';
  mainInfo!: FormGroup;
  addressInfo!: FormGroup;
  user!: UserModel;
  countries!: any;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initMainInfoForm();
    this.initAddressInfoForm();
    this.authService
      .getAllCountries()
      .subscribe((data) => (this.countries = data));
  }

  initMainInfoForm() {
    this.mainInfo = this.fb.group(
      {
        firstName: [null, [Validators.required, Validators.minLength(3)]],
        lastName: [null, [Validators.required, Validators.minLength(3)]],
        userName: [null, [Validators.required, Validators.minLength(3)]],
        phone: [
          null,
          [
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
            Validators.minLength(10),
            Validators.maxLength(13),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, Validators.required],
      },
      {
        validators: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  initAddressInfoForm() {
    this.addressInfo = this.fb.group({
      userAddress: this.fb.array([this.createAddressGroup()]),
    });
  }

  addAddressGroup() {
    this.getAddressInfoArray.push(this.createAddressGroup());
  }

  createAddressGroup() {
    return this.fb.group({
      addressType: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      postalCode: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  get getMainInfoForm() {
    return this.mainInfo.controls;
  }

  get getAddressInfoForm() {
    return this.addressInfo.controls;
  }

  get getAddressInfoArray() {
    return this.addressInfo.get('userAddress') as FormArray;
  }

  get getAddressControls() {
    return (this.addressInfo.get('userAddress') as FormArray).controls;
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

  changePage(pageName: string) {
    this.page = pageName;
  }

  deleteAddressControl(i: number) {
    this.getAddressInfoArray.removeAt(i);
  }

  onCancel() {
    this.page = 'mainInfo';
    this.addressInfo.reset();
    this.mainInfo.reset();
  }

  onSave() {
    const userInfo: UserModel = this.mainInfo.value;
    const addressInfo: AddressModel[] = this.addressInfo.value;
    const user = Object.assign(userInfo, addressInfo);
    this.authService.createUser(user).subscribe(() => {
      this.authService.isAuth.next(true);
      this.router.navigate(['user-info']);
      this.authService.setUser(user);
    });
  }
}
