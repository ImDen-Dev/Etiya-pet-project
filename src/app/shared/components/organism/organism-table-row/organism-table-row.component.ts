import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressModel } from '../../../models/address.model';
import { Store } from '@ngxs/store';
import {
  SetDeleteUserInfoAction,
  UpdateUserAction,
} from '../../../states/users-table-state/users-table.actions';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'organism-table-row',
  templateUrl: './organism-table-row.component.html',
  styleUrls: ['./organism-table-row.component.scss'],
})
export class OrganismTableRowComponent implements OnInit {
  @Input() user!: UserModel;
  editedUser!: UserModel | null;
  isEdit!: number | boolean;
  form!: FormGroup;
  delete: boolean = false;
  countries!: any;
  isAddress = false;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCountries();
  }

  getCountries() {
    this.auth
      .getAllCountries()
      .subscribe((countries) => (this.countries = countries));
  }

  get userAddresses() {
    return this.form.get('userAddress') as FormArray;
  }

  initForm() {
    this.form = this.fb.group({
      firstName: [
        this.user.firstName,
        [Validators.required, Validators.minLength(3)],
      ],
      lastName: [
        this.user.lastName,
        [Validators.required, Validators.minLength(3)],
      ],
      userName: [
        this.user.userName,
        [Validators.required, Validators.minLength(3)],
      ],
      phone: [
        this.user.phone,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(17),
          Validators.pattern(/[-+()0-9]/g),
        ],
      ],
      email: [this.user.email, [Validators.required, Validators.email]],
      id: [this.user.id],
      password: [this.user.password],
      userAddress: this.fb.array([]),
    });
    if (this.user.userAddress.length > 0)
      this.user.userAddress.forEach((a) => this.addAddress(a));
  }

  addAddress(value: AddressModel) {
    this.userAddresses.push(this.addressGroup(value));
  }

  addressGroup(address: AddressModel) {
    return this.fb.group({
      addressType: [address.addressType, Validators.required],
      address: [address.address, Validators.required],
      city: [address.city, Validators.required],
      country: [address.country, Validators.required],
      postalCode: [
        address.postalCode,
        [Validators.required, Validators.pattern(/^[0-9]+$/)],
      ],
    });
  }

  deleteAddress(index: number) {
    this.userAddresses.removeAt(index);
  }

  onEdit(field: number | boolean) {
    this.isEdit = field;
    this.editedUser = this.form.value as UserModel;
  }

  onCancel() {
    if (this.editedUser) this.form.patchValue(this.editedUser);
    this.onEdit(false);
  }

  onDelete(index?: number) {
    if (index) {
      this.deleteAddress(index);
      this.isAddress = true;
    }
    const user = this.form.value as UserModel;
    this.store.dispatch(new SetDeleteUserInfoAction(user.id as number, user));
    this.delete = true;
  }

  onSubmit() {
    const user = this.form.value as UserModel;
    this.store.dispatch(new UpdateUserAction(user.id as number, user));
    this.onEdit(false);
  }
}
