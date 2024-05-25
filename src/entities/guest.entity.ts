import crypto from 'crypto';

import {
  Entity,
  Enum,
  ManyToOne,
  Property,
  Unique,
  wrap
} from '@mikro-orm/core';

import { GuestGender, GuestSide, Role } from '@types';

import { AdminEntity } from './admin.entity';
import { InviteGroupEntity } from './inviteGroup.entity';
import { UserEntity } from './user.entity';

@Entity({
  tableName: 'guest'
})
export class GuestEntity extends UserEntity {
  @Property()
  @Unique()
  inviteId: string = crypto.randomUUID();

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Enum(() => GuestSide)
  side: GuestSide;

  @Enum(() => GuestGender)
  gender: GuestGender;

  @Property({ default: false })
  isAdult: boolean;

  @ManyToOne(() => InviteGroupEntity, { nullable: true })
  inviteGroup?: InviteGroupEntity;

  @ManyToOne(() => AdminEntity, {
    nullable: true,
    serializer: value => value?.email || null
  })
  createdBy: AdminEntity;

  @ManyToOne(() => AdminEntity, {
    nullable: true,
    serializer: value => value?.email || null
  })
  modifyBy?: AdminEntity;

  constructor(
    firstName: string,
    lastName: string,
    side: GuestSide,
    gender: GuestGender,
    isAdult: boolean,
    createdBy: AdminEntity
  ) {
    super();
    this.role = Role.guest;
    this.firstName = firstName;
    this.lastName = lastName;
    this.side = side;
    this.gender = gender;
    this.isAdult = isAdult;
    this.createdBy = createdBy;
  }

  toJSON(args?: string[]) {
    const object = wrap(this).toObject();

    return args?.includes(Role.admin)
      ? object
      : Object.entries(object).reduce((acm, [key, value]) => {
          if (
            ![
              '_id',
              'createdAt',
              'updatedAt',
              'createdBy',
              'modifyBy',
              'inviteGroup'
            ].includes(key)
          ) {
            (acm as any)[key] = value;
          }

          return acm;
        }, {} as any);
  }
}
