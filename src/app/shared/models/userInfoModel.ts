import { AddressModel } from './address.model';

export interface UserInfoModel {
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
