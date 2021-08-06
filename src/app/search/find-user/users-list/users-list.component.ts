import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../shared/services/user.service';
import { UserModel } from '../../../shared/models/user.model';
import { AddressModel } from '../../../shared/models/address.model';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../shared/states/auth-state/auth.state';
import { UsersTableState } from '../../../shared/states/users-table-state/users-table.state';
import { SearchState } from '../../../shared/states/search-state/search.state';
import { SortAction } from '../../../shared/states/search-state/search.actions';
import { CreateUserState } from '../../../shared/states/create-user-state/create-user.state';
import { SelectModel } from '../../../shared/models/select.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  forms!: FormGroup;
  users!: UserModel[];
  sortOrder = '';
  sortBy = '';
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private store: Store
  ) {}

  @Select(AuthState.isAuth) isAuth$!: Observable<boolean>;
  @Select(SearchState.getUsers) users$!: Observable<UserModel[]>;
  @Select(UsersTableState.getOpenUser) opened$!: Observable<number | null>;
  @Select(UsersTableState.edit) edit$!: Observable<{
    user: UserModel | null;
    userId: number | null;
    addressIndex: number | null;
  }>;
  @Select(CreateUserState.getCountries) countries$!: Observable<SelectModel[]>;
  ngOnInit(): void {
    this.getUsers();
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

  get getFoundUsers(): FormArray {
    return this.forms.get('foundUsers') as FormArray;
  }

  getUserAddresses(index: number): FormArray {
    return this.getFoundUsers.at(index).get('userAddress') as FormArray;
  }

  addUserToForm(users: UserModel[]) {
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

  userGroup(user: UserModel): FormGroup {
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

  sort(sortBy: string) {
    if (this.sortBy !== sortBy) {
      this.sortOrder = '';
    }
    this.sortBy = sortBy;
    if (this.sortOrder === '') {
      this.sortOrder = 'desc';
    } else if (this.sortOrder === 'desc') {
      this.sortOrder = 'asc';
    } else if (this.sortOrder === 'asc') {
      this.sortOrder = '';
      this.sortBy = '';
    }
    this.store.dispatch(
      new SortAction({ sortBy: this.sortBy, sortOrder: this.sortOrder })
    );
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.map((sub) => sub.unsubscribe());
    }
  }
}
