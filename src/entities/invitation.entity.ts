import { Entity, Enum, OneToOne, Property, wrap } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { InviteGroupEntity } from './inviteGroup.entity';
import { TransferFrom } from '@types';
import { serializeId } from '@utils';

@Entity({
  tableName: 'invitation'
})
export class InvitationEntity extends BaseEntity {
  @Property({ default: false })
  checkSlip: boolean;

  @Property({ default: false })
  checkTransport: boolean;

  @Property({ default: false })
  needOneMorePlace: boolean;

  @Enum(() => TransferFrom)
  transportFrom: TransferFrom;

  @OneToOne(() => InviteGroupEntity, { nullable: true })
  inviteGroup?: InviteGroupEntity;

  constructor(
    checkSlip: boolean,
    checkTransport: boolean,
    needOneMorePlace: boolean,
    transportFrom: TransferFrom
  ) {
    super();
    this.checkSlip = checkSlip;
    this.needOneMorePlace = needOneMorePlace;
    this.checkTransport = checkTransport;
    this.transportFrom = transportFrom;
  }

  toJSON(_args?: string[]) {
    const object = wrap(this).toObject();

    serializeId(this, object);

    return Object.entries(object).reduce((acm, [key, value]) => {
      // skip the fields: createdAt, updatedAt, _id, id
      if (
        ![
          'id',
          '_id',
          'createdAt',
          'updatedAt',
          'createdBy',
          'modifyBy'
        ].includes(key)
      ) {
        (acm as any)[key] = value;
      }

      return acm;
    }, {} as any);
  }
}
