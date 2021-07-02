import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../shared/user.service';
import { UserInfoModel } from '../../../shared/user-info.model';
import { AddressModel } from '../../../auth/address.model';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isEditUser!: number;
  usersArray!: number[];
  forms!: FormGroup;
  users!: UserInfoModel[];
  countries!: { name: string }[];
  isShowPopup = false;
  deleteUserIndex!: number | undefined;
  deleteAddressIndex!: number | undefined;
  deleteUserId!: number | undefined;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getCountries();
  }

  getUsers() {
    const usersSub = this.userService.foundUsers.subscribe((users) => {
      this.forms = this.fb.group({
        foundUsers: this.fb.array([]),
      });
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
    this.usersArray = new Array(users.length).fill(0);
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
          Validators.maxLength(13),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      email: [user.email, [Validators.required, Validators.email]],
      id: [user.id],
      password: [user.password],
      userAddress: this.fb.array([]),
    });
  }

  onDeleteUser(id: number, userIndex: number) {
    const deleteUserSub = this.userService.deleteUser(id).subscribe(
      () => {
        this.getFoundUsers.removeAt(userIndex);
      },
      (error) => console.log(error)
    );
    this.subscriptions.push(deleteUserSub);
  }

  onDeleteAddress(id: number, userIndex: number, addressIndex: number) {
    const userValue: UserInfoModel = this.getFoundUsers.at(userIndex).value;
    userValue.userAddress.splice(addressIndex, addressIndex + 1);
    const deleteUserAddressSub = this.userService
      .deleteUserAddress(id, userValue)
      .subscribe(
        () => {
          (
            this.getFoundUsers.at(userIndex).get('userAddress') as FormArray
          ).removeAt(addressIndex);
        },
        (error) => console.log(error)
      );
    this.subscriptions.push(deleteUserAddressSub);
  }

  onDelete(id: number, userIndex: number, addressIndex?: number) {
    this.isShowPopup = true;
    this.deleteUserId = id;
    this.deleteUserIndex = userIndex;
    if (addressIndex !== undefined) this.deleteAddressIndex = addressIndex;
  }

  delete() {
    if (
      this.deleteUserId !== undefined &&
      this.deleteUserIndex !== undefined &&
      this.deleteAddressIndex !== undefined
    ) {
      this.onDeleteAddress(
        this.deleteUserId,
        this.deleteUserIndex,
        this.deleteAddressIndex
      );
      this.onCancelDelete();
    } else if (
      this.deleteUserId !== undefined &&
      this.deleteUserIndex !== undefined
    ) {
      this.onDeleteUser(this.deleteUserId, this.deleteUserIndex);
      this.onCancelDelete();
    } else {
      this.onCancelDelete();
    }
  }

  onCancelDelete() {
    this.isShowPopup = false;
    this.deleteUserId = undefined;
    this.deleteUserIndex = undefined;
    this.deleteAddressIndex = undefined;
  }

  onAddNewAddressField(userIndex: number) {
    (this.getFoundUsers.at(userIndex).get('userAddress') as FormArray).push(
      this.fb.group({
        addressType: [null, Validators.required],
        address: [null, Validators.required],
        city: [null, Validators.required],
        country: [null, Validators.required],
        postalCode: [
          null,
          [Validators.required, Validators.pattern(/^[0-9]+$/)],
        ],
      })
    );
    const addressIndex = this.getUserAddresses(userIndex).length - 1;
    this.onEditUserAddress(userIndex, addressIndex);
  }

  onSave(id: number, userIndex: number) {
    const body = this.getFoundUsers.at(userIndex).value;
    const addUserAddressSub = this.userService
      .addUserAddress(id, body)
      .subscribe(
        () => {
          this.users[userIndex] = this.getFoundUsers.at(userIndex).value;
          this.exitEditMode();
        },
        (error) => console.log(error)
      );
    this.subscriptions.push(addUserAddressSub);
  }

  onEditUser(index: number) {
    this.getFoundUsers.patchValue(this.users);
    this.exitEditMode();
    this.isEditUser = index;
  }
  onEditUserAddress(userIndex: number, addressIndex: number) {
    this.getFoundUsers.patchValue(this.users);
    this.exitEditMode();
    this.usersArray[userIndex] = addressIndex + 1;
  }

  exitEditMode() {
    this.usersArray.fill(0);
    this.isEditUser = NaN;
  }

  onCancel(userIndex: number) {
    this.getFoundUsers.at(userIndex).patchValue(this.users[userIndex]);
    this.exitEditMode();
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.map((sub) => sub.unsubscribe());
    }
  }
}
