import { Enum, Property } from '@mikro-orm/core';

import { Role } from '@types';

import { BaseEntity } from './base.entity';

export class UserEntity extends BaseEntity {
  @Enum(() => Role)
  role!: Role;

  @Property()
  isRemoved: boolean = false;
}
