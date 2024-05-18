import { UserType } from './user.type';

enum GuestSide {
  wife = 'wife',
  husband = 'husband'
}

enum GuestGender {
  male = 'male',
  female = 'female'
}

type Guest = UserType & {
  firstName: string;
  lastName: string;
  side: GuestSide;
  gender: GuestGender;
  isAdult: boolean;
  inviteId: string;
};

type GuestType = Omit<Guest, 'role'>;

export type CreateGuestRequestBody = Pick<
  Guest,
  'firstName' | 'lastName' | 'isAdult' | 'side' | 'gender'
>;

type EditGuestRequestBody = { id: string } & Partial<CreateGuestRequestBody>;

type LoginGuestRequestBody = Pick<Guest, 'inviteId'>;

export { GuestSide, GuestGender };

export type { GuestType, EditGuestRequestBody, LoginGuestRequestBody };
