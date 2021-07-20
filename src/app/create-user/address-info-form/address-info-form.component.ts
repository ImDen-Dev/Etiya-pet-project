import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CreateUserState } from '../../shared/states/create-user-state/create-user.state';
import { AddressModel } from '../../shared/models/address.model';
import { SetAddressInfoAction } from '../../shared/states/create-user-state/create-user.actions';

@Component({
  selector: 'app-address-info-form',
  templateUrl: './address-info-form.component.html',
  styleUrls: ['./address-info-form.component.scss'],
})
export class AddressInfoFormComponent implements OnInit {
  addressInfo!: FormGroup;
  countries: { name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initAddressInfoForm();
    this.getCountries();
    const userAddresses = this.store.selectSnapshot(
      CreateUserState.getUserAddressInfo
    );
    userAddresses.length > 0
      ? userAddresses.forEach((address) => this.addAddressGroup(address))
      : this.addAddressGroup();
  }

  getCountries(): void {
    this.authService
      .getAllCountries()
      .subscribe((data) => (this.countries = data));
  }

  initAddressInfoForm() {
    this.addressInfo = this.fb.group({
      userAddress: this.fb.array([]),
    });
  }

  createAddressGroup(address?: AddressModel) {
    return this.fb.group({
      addressType: [address?.addressType, Validators.required],
      address: [address?.address, Validators.required],
      city: [address?.city, Validators.required],
      country: [address?.country, Validators.required],
      postalCode: [
        address?.postalCode,
        [
          Validators.required,
          Validators.pattern(/[0-9]/g),
          Validators.maxLength(5),
        ],
      ],
    });
  }

  addAddressGroup(address?: AddressModel) {
    this.getAddressInfoArray.push(this.createAddressGroup(address));
  }

  get getAddressInfoArray() {
    return this.addressInfo.get('userAddress') as FormArray;
  }

  get getAddressControls() {
    return (this.addressInfo.get('userAddress') as FormArray).controls;
  }

  deleteAddressControl(i: number) {
    this.getAddressInfoArray.removeAt(i);
  }

  previousPage() {
    if (this.onSubmit()) return;
    this.router.navigate(['/create-user']);
  }

  nextPage() {
    if (this.onSubmit()) return;
    this.router.navigate(['/create-user/summary']);
  }

  onSubmit(): boolean {
    if (!this.addressInfo.valid) {
      this.addressInfo.markAllAsTouched();
      return true;
    }
    this.store.dispatch(
      new SetAddressInfoAction(this.getAddressInfoArray.value)
    );
    return false;
  }
}
