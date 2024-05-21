import { UserType } from './user.type';

export type AuthAdminType = UserType & {
  email: string;
  password: string;
};

export type CreateAdminRequestBody = Pick<AuthAdminType, 'email' | 'password'>;
export type LoginAdminRequestBody = Pick<AuthAdminType, 'email' | 'password'>;
