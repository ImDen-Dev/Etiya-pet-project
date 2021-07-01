import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { UserInfoModel } from '../../../shared/user-info.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AddressModel } from '../../../auth/address.model';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  isEditUser!: number;
  usersArray!: Array<number>;
  forms!: FormGroup;
  users!: UserInfoModel[];
  countries!: { name: string }[];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.foundUsers.subscribe((users) => {
      this.forms = this.fb.group({
        foundUsers: this.fb.array([]),
      });
      if (users) {
        this.users = users;
        this.addUserToForm(users);
      }
    });
    this.authService.getAllCountries().subscribe(
      (countries) => (this.countries = countries),
      (error) => console.log(error)
    );
  }

  get getFoundUsers(): FormArray {
    return this.forms.get('foundUsers') as FormArray;
  }

  getUserAddresses(index: number): FormArray {
    return this.getFoundUsers.at(index).get('userAddress') as FormArray;
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
      addressType: [address.addressType],
      address: [address.address],
      city: [address.city],
      country: [address.country],
      postalCode: [address.postalCode],
    });
  }

  userGroup(user: UserInfoModel): FormGroup {
    return this.fb.group({
      firstName: [user.firstName],
      lastName: [user.lastName],
      userName: [user.userName],
      phone: [user.phone],
      email: [user.email],
      id: [user.id],
      password: [user.password],
      userAddress: this.fb.array([]),
    });
  }

  onDeleteUser(id: number, userIndex: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.getFoundUsers.removeAt(userIndex);
      },
      (error) => console.log(error)
    );
  }

  onDeleteAddress(id: number, userIndex: number, addressIndex: number) {
    const userValue: UserInfoModel = this.getFoundUsers.at(userIndex).value;
    userValue.userAddress.splice(addressIndex, addressIndex + 1);
    this.userService.deleteUserAddress(id, userValue).subscribe(
      () => {
        (
          this.getFoundUsers.at(userIndex).get('userAddress') as FormArray
        ).removeAt(addressIndex);
      },
      (error) => console.log(error)
    );
  }

  onAddNewAddressField(userIndex: number) {
    (this.getFoundUsers.at(userIndex).get('userAddress') as FormArray).push(
      this.fb.group({
        addressType: [null],
        address: [null],
        city: [null],
        country: [null],
        postalCode: [null],
      })
    );
    const addressIndex = this.getUserAddresses(userIndex).length - 1;
    this.onEditUserAddress(userIndex, addressIndex);
  }

  onSave(id: number, userIndex: number) {
    const body = this.getFoundUsers.at(userIndex).value;
    this.userService.addUserAddress(id, body).subscribe(
      () => {
        this.users[userIndex] = this.getFoundUsers.at(userIndex).value;
        this.exitEditMode();
      },
      (error) => console.log(error)
    );
  }

  onEditUser(index: number) {
    this.exitEditMode();
    this.isEditUser = index;
  }
  onEditUserAddress(userIndex: number, addressIndex: number) {
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
}
