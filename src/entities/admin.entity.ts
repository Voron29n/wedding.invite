import { Entity, Property, Unique } from '@mikro-orm/core';

import { Role } from '@types';

import { UserEntity } from './user.entity';

@Entity({
  tableName: 'admin'
})
export class AdminEntity extends UserEntity {
  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
    this.role = Role.admin;
  }
}
