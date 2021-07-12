import { UserModel } from './user.model';
import { AddressModel } from './address.model';

export interface UserInfoModel extends UserModel {
  id?: number;
  userAddress: AddressModel[];
}
