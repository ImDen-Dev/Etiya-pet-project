import { UserInfoModel } from './userInfoModel';
import { AddressModel } from './address.model';

export interface UserModel extends UserInfoModel {
  id?: number;
  userAddress: AddressModel[];
}
