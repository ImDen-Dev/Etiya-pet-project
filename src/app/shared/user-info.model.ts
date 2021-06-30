import { UserModel } from '../auth/user.model';
import { AddressModel } from '../auth/address.model';

export interface UserInfoModel extends UserModel {
  userAddress: AddressModel[];
}
