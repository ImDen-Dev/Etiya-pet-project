import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../shared/services/user.service';
import { UserInfoModel } from '../../../shared/models/user-info.model';
import { AddressModel } from '../../../shared/models/address.model';
import { AuthService } from '../../../shared/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../shared/states/auth-state/auth.state';
import { UsersState } from '../../../shared/states/users-state/users.state';
import {
  DeleteUserAction,
  DeleteUserAddressAction,
  DeleteUserDefaultAction,
  EditUserAction,
  ExitEditUserAction,
  OpenUserAction,
  ResetStateAction,
  SetDeleteUserInfoAction,
  UpdateUserAction,
} from '../../../shared/states/users-state/users.actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  forms!: FormGroup;
  users!: UserInfoModel[];
  countries!: { name: string }[];
  isShowPopup = false;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public authService: AuthService,
    private store: Store
  ) {}

  @Select(AuthState.isAuth) isAuth$!: Observable<boolean>;
  @Select(UsersState.getUsers) users$!: Observable<UserInfoModel[]>;
  @Select(UsersState.getOpenUser) opened$!: Observable<number | null>;
  @Select(UsersState.edit) edit$!: Observable<{
    user: UserInfoModel | null;
    userId: number | null;
    addressIndex: number | null;
  }>;

  ngOnInit(): void {
    this.getUsers();
    this.getCountries();
  }

  initForm() {
    this.forms = this.fb.group({
      foundUsers: this.fb.array([]),
    });
  }

  getUsers() {
    const usersSub = this.users$.subscribe((users) => {
      if (users) {
        this.users = users;
        this.addUserToForm(users);
      }
    });
    this.subscriptions.push(usersSub);
  }

  getCountries() {
    const countriesSub = this.authService.getAllCountries().subscribe(
      (countries) => (this.countries = countries),
      (error) => console.log(error)
    );
    this.subscriptions.push(countriesSub);
  }

  get getFoundUsers(): FormArray {
    return this.forms.get('foundUsers') as FormArray;
  }

  getUserAddresses(index: number): FormArray {
    return this.getFoundUsers.at(index).get('userAddress') as FormArray;
  }

  getUserAddressControls(userIndex: number, addressIndex: number) {
    return this.getUserAddresses(userIndex).at(addressIndex);
  }

  addUserToForm(users: UserInfoModel[]) {
    this.initForm();
    users.forEach((user, index) => {
      this.getFoundUsers.push(this.userGroup(user));
      this.addAddressesToUser(user.userAddress, index);
    });
  }

  addAddressesToUser(addresses: AddressModel[], index: number) {
    addresses.forEach((address) => {
      this.getUserAddresses(index).push(this.addAddress(address));
    });
  }

  addAddress(address: AddressModel): FormGroup {
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

  userGroup(user: UserInfoModel): FormGroup {
    return this.fb.group({
      firstName: [
        user.firstName,
        [Validators.required, Validators.minLength(3)],
      ],
      lastName: [user.lastName, [Validators.required, Validators.minLength(3)]],
      userName: [user.userName, [Validators.required, Validators.minLength(3)]],
      phone: [
        user.phone,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(17),
          Validators.pattern(/[-+()0-9]/g),
        ],
      ],
      email: [user.email, [Validators.required, Validators.email]],
      id: [user.id],
      password: [user.password],
      userAddress: this.fb.array([]),
    });
  }

  openUser(userId: number) {
    this.store.dispatch(new OpenUserAction(userId));
  }

  onDelete(id: number, userIndex: number, addressIndex: number | null) {
    this.isShowPopup = true;

    if (addressIndex !== null) {
      const userValue: UserInfoModel = this.getFoundUsers.at(userIndex).value;
      userValue.userAddress.splice(addressIndex, addressIndex + 1);
      this.store.dispatch(new SetDeleteUserInfoAction(id, userValue));
    } else {
      this.store.dispatch(new SetDeleteUserInfoAction(id, null));
    }
  }

  removeAddressFromForm(userIndex: number, addressIndex: number) {
    (this.getFoundUsers.at(userIndex).get('userAddress') as FormArray).removeAt(
      addressIndex
    );
  }

  delete() {
    const { user } = this.store.selectSnapshot(UsersState.deleteInfo);
    if (!user) {
      this.store.dispatch(new DeleteUserAction());
    } else {
      this.store.dispatch(new DeleteUserAddressAction());
    }
    this.isShowPopup = false;
  }

  onCancelDelete() {
    this.isShowPopup = false;
    this.store.dispatch(new DeleteUserDefaultAction());
  }

  onAddNewAddressField(userIndex: number) {
    (this.getFoundUsers.at(userIndex).get('userAddress') as FormArray).push(
      this.fb.group({
        addressType: [null, Validators.required],
        address: [null, Validators.required],
        city: [null, Validators.required],
        country: [null, Validators.required],
        postalCode: [null, [Validators.required, Validators.pattern(/[0-9]/g)]],
      })
    );
    const addressIndex = this.getUserAddresses(userIndex).length - 1;
    this.onEditUserAddress(userIndex, addressIndex);
  }

  onSave(id: number, userIndex: number) {
    const body = this.getFoundUsers.at(userIndex).value;
    const addUserAddressSub = this.store
      .dispatch(new UpdateUserAction(id, body))
      .subscribe(
        () => {
          this.exitEditMode();
        },
        (error) => console.log(error)
      );
    this.subscriptions.push(addUserAddressSub);
  }

  onEditUserAddress(userIndex: number, addressIndex: number) {
    this.onEdit(this.users[userIndex].id as number, addressIndex);
  }

  onEdit(userId: number, addressIndex: number | null) {
    this.getFoundUsers.patchValue(this.users);
    this.store.dispatch(new EditUserAction(userId, addressIndex));
  }

  exitEditMode() {
    this.store.dispatch(new ExitEditUserAction());
  }

  onCancel(userIndex: number, addressIndex?: number) {
    if (addressIndex) {
      if (this.getUserAddressControls(userIndex, addressIndex).invalid) {
        this.removeAddressFromForm(userIndex, addressIndex);
      }
    }

    this.getFoundUsers.at(userIndex).patchValue(this.users[userIndex]);
    this.exitEditMode();
    this.store.dispatch(new DeleteUserDefaultAction());
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetStateAction());
    if (this.subscriptions.length > 0) {
      this.subscriptions.map((sub) => sub.unsubscribe());
    }
  }
}
