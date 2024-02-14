import { UserType } from './user.type';

export type AdminType = UserType & {
  email: string;
  password: string;
};

export type CreateAdminRequestBody = Pick<AdminType, 'email' | 'password'>;
export type LoginAdminRequestBody = Pick<AdminType, 'email' | 'password'>;
