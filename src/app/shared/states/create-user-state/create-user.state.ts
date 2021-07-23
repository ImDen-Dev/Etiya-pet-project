import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserInfoModel } from '../../models/userInfoModel';
import { AddressModel } from '../../models/address.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  GetCountries,
  ResetCreateUserStateAction,
  SaveUserAction,
  SetAddressInfoAction,
  SetUserInfoAction,
} from './create-user.actions';
import { CreateUserAction } from './create-user.actions';
import { UserService } from '../../services/user.service';
import { SelectModel } from '../../models/select.model';
import { tap } from 'rxjs/operators';

export interface CreateUserStateModel {
  userInfo: UserInfoModel;
  addressInfo: AddressModel[];
  countries: { name: string }[];
}

@State<CreateUserStateModel>({
  name: 'CreateUser',
  defaults: {
    userInfo: {} as UserModel,
    addressInfo: [],
    countries: [],
  },
})
@Injectable()
export class CreateUserState {
  constructor(private userService: UserService) {}

  @Selector()
  static getUserInfo({ userInfo }: CreateUserStateModel): UserInfoModel {
    return userInfo;
  }
  @Selector()
  static getUserAddressInfo({
    addressInfo,
  }: CreateUserStateModel): AddressModel[] {
    return addressInfo;
  }

  @Selector()
  static getUser({ userInfo, addressInfo }: CreateUserStateModel): UserModel {
    return { ...userInfo, userAddress: [...addressInfo] };
  }

  @Selector()
  static getCountries({ countries }: CreateUserStateModel): SelectModel[] {
    return countries.map((country) => ({
      name: country.name,
      value: country.name,
    }));
  }

  @Action(CreateUserAction)
  createUser(
    { patchState, dispatch }: StateContext<CreateUserStateModel>,
    action: CreateUserAction
  ) {
    return this.userService.createUser(action.payload);
  }

  @Action(SetUserInfoAction)
  setUserInfo(
    { patchState }: StateContext<CreateUserStateModel>,
    { payload }: SetUserInfoAction
  ) {
    patchState({
      userInfo: { ...payload },
    });
  }
  @Action(SetAddressInfoAction)
  setUserAddressInfo(
    { patchState }: StateContext<CreateUserStateModel>,
    { payload }: SetAddressInfoAction
  ) {
    patchState({
      addressInfo: [...payload],
    });
  }

  @Action(SaveUserAction)
  saveUser({ getState, dispatch }: StateContext<CreateUserStateModel>) {
    const state = getState();
    const { userInfo, addressInfo } = state;
    dispatch(
      new CreateUserAction({ ...userInfo, userAddress: [...addressInfo] })
    );
  }

  @Action(ResetCreateUserStateAction)
  resetState({ patchState }: StateContext<CreateUserStateModel>) {
    patchState({
      userInfo: {} as UserModel,
      addressInfo: [],
    });
  }

  @Action(GetCountries)
  getCountries({ patchState }: StateContext<CreateUserStateModel>) {
    return this.userService
      .getAllCountries()
      .pipe(tap((countries) => patchState({ countries: [...countries] })));
  }
}
