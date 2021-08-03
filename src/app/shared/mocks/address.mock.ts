import { AddressModel } from '../models/address.model';

export const userAddressMock: AddressModel[] = [
  {
    addressType: 'Billing Address',
    address: 'Prospekt',
    city: 'Chernivtci',
    country: 'Ukraine',
    postalCode: 58005,
  },
  {
    addressType: 'Shipping Address',
    address: 'Golovna',
    city: 'Lviv',
    country: 'Austria',
    postalCode: 50185,
  },
];
