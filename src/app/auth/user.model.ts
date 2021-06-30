import { AddressModel } from './address.model';

export interface UserModel {
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  email: string;
  password?: string;
  userAddress?: AddressModel[];
}
