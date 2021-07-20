import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserInfoModel } from '../../models/userInfoModel';
import { AddressModel } from '../../models/address.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  ResetCreateUserStateAction,
  SaveUserAction,
  SetAddressInfoAction,
  SetUserInfoAction,
} from './create-user.actions';
import { CreateUserAction } from '../auth-state/auth.actions';

export interface CreateUserStateModel {
  userInfo: UserInfoModel;
  addressInfo: AddressModel[];
}

@State<CreateUserStateModel>({
  name: 'CreateUser',
  defaults: {
    userInfo: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    addressInfo: [],
  },
})
@Injectable()
export class CreateUserState {
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
  resetState({ setState }: StateContext<CreateUserStateModel>) {
    setState({
      userInfo: {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      },
      addressInfo: [],
    });
  }
}
