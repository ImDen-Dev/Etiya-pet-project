import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { UserInfoModel } from '../../../shared/user-info.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AddressModel } from '../../../auth/address.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  isEdit!: number;
  forms!: FormGroup;
  users!: UserInfoModel[];

  constructor(private userService: UserService, private fb: FormBuilder) {}

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
  }

  get getFoundUsers(): FormArray {
    return this.forms.get('foundUsers') as FormArray;
  }

  getUserAddresses(index: number): FormArray {
    return this.getFoundUsers.at(index).get('userAddresses') as FormArray;
  }

  getUserValue(control: string) {
    return this.getFoundUsers.get(control);
  }

  addUserToForm(users: UserInfoModel[]) {
    users.forEach((user, index) => {
      this.getFoundUsers.push(this.userGroup(user));
      this.addAddressesToUser(user.userAddress, index);
    });
  }

  addAddressesToUser(addresses: AddressModel[], index: number) {
    addresses.forEach((address) => {
      this.getUserAddresses(index).push(
        this.fb.group({
          addressType: [address.addressType],
          address: [address.address],
          city: [address.city],
          country: [address.country],
          postalCode: [address.postalCode],
        })
      );
    });
  }

  userGroup(user: UserInfoModel) {
    return this.fb.group({
      firstName: [user.firstName],
      lastName: [user.lastName],
      userName: [user.userName],
      phone: [user.phone],
      email: [user.email],
      userAddresses: this.fb.array([]),
      id: [user.id],
    });
  }

  onUpdate(i: number) {
    this.isEdit = i;
  }

  onDelete(id: number, userIndex: number, arrayIndex?: number) {
    if (!arrayIndex) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.getFoundUsers.removeAt(userIndex);
        },
        (error) => console.log(error)
      );
    } else {
      this.userService.deleteUserAddress(id, arrayIndex).subscribe(() => {
        (
          this.getFoundUsers.at(userIndex).get('userAddresses') as FormArray
        ).removeAt(arrayIndex);
      });
    }
  }
}
