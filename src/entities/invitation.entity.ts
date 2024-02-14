import { Entity, OneToOne, Property, wrap } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { InviteGroupEntity } from './inviteGroup.entity';

@Entity({
  tableName: 'invitation'
})
export class InvitationEntity extends BaseEntity {
  @Property()
  inviteTitle: string;

  @Property({ default: false })
  checkSlip: boolean;

  @Property({ default: false })
  checkTransport: boolean;

  @OneToOne(() => InviteGroupEntity, { nullable: true })
  inviteGroup?: InviteGroupEntity;

  constructor(
    inviteTitle: string,
    checkSlip: boolean,
    checkTransport: boolean
  ) {
    super();
    this.inviteTitle = inviteTitle;
    this.checkSlip = checkSlip;
    this.checkTransport = checkTransport;
  }

  toJSON(args?: string[]) {
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
