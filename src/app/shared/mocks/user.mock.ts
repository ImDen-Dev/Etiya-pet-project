import { UserModel } from '../models/user.model';

export const usersMock: UserModel[] = [
  {
    firstName: 'Denis',
    lastName: 'Diachuk',
    userName: 'Denchik',
    phone: '0997572350',
    email: 'neckromant90@gmail.com',
    id: 2,
    password: '123456',
    userAddress: [
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
    ],
  },
  {
    firstName: 'Matvii',
    lastName: 'Matvii',
    userName: 'Matviy',
    phone: '1234567897',
    email: 'Matvii@mat',
    id: 3,
    password: '123456',
    userAddress: [
      {
        addressType: 'Shipping Address',
        address: 'Kulp',
        city: 'Lviv',
        country: 'Ukraine',
        postalCode: 5806,
      },
    ],
  },
  {
    firstName: 'Nazar',
    lastName: 'Muntian',
    userName: 'Nazarchik',
    phone: '1234968778',
    email: 'dsasd@dsa',
    id: 4,
    password: '123456',
    userAddress: [
      {
        addressType: 'Billing Address',
        address: 'Golovna',
        city: 'Odessa',
        country: 'Ukraine',
        postalCode: 69004,
      },
    ],
  },
  {
    firstName: 'sgfdsgfdg',
    lastName: 'sfgdsdfgsd',
    userName: 'gfsdfgsdfg',
    phone: '5234523452345',
    email: 'asdfgasd@dasdf',
    id: 5,
    password: '123456',
    userAddress: [
      {
        addressType: 'Home Address',
        address: 'fgdsfdg',
        city: 'sfdgsdfg',
        country: 'Bahrain',
        postalCode: 234523452345,
      },
      {
        addressType: 'Home Address',
        address: 'sfdgfdsgf',
        city: 'ebvbv',
        country: 'Australia',
        postalCode: 6534653456,
      },
    ],
  },
];
