import { Entity, OneToOne, Property, wrap } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { InviteGroupEntity } from './inviteGroup.entity';

@Entity({
  tableName: 'invitation'
})
export class InvitationEntity extends BaseEntity {
  @Property({ default: false })
  checkSlip: boolean;

  @Property({ default: false })
  checkTransport: boolean;

  @OneToOne(() => InviteGroupEntity, { nullable: true })
  inviteGroup?: InviteGroupEntity;

  constructor(checkSlip: boolean, checkTransport: boolean) {
    super();
    this.checkSlip = checkSlip;
    this.checkTransport = checkTransport;
  }

  toJSON(_args?: string[]) {
    const object = wrap(this).toObject();

    return Object.entries(object).reduce((acm, [key, value]) => {
      // skip the fields: createdAt, updatedAt, _id, id
      if (!['createdAt', 'updatedAt', '_id', 'id'].includes(key)) {
        (acm as any)[key] = value;
      }

      return acm;
    }, {});
  }
}
