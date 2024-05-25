import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
  Unique,
  wrap
} from '@mikro-orm/core';

import { AdminEntity } from './admin.entity';
import { BaseEntity } from './base.entity';
import { GuestEntity } from './guest.entity';
import { InvitationEntity } from './invitation.entity';
import { Role } from '@types';
import { SurveyResponsesEntity } from '@src/entities/surveyResponses.entity';

@Entity({
  tableName: 'invite_group'
})
export class InviteGroupEntity extends BaseEntity {
  @Property()
  @Unique()
  groupName: string;

  @OneToMany(() => GuestEntity, guest => guest.inviteGroup, { nullable: true })
  guests = new Collection<GuestEntity>(this);

  @OneToOne(() => InvitationEntity)
  invitation: InvitationEntity;

  @OneToOne(() => SurveyResponsesEntity, {
    nullable: true
  })
  surveyResponses?: SurveyResponsesEntity;

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
    groupName: string,
    guests: GuestEntity[],
    invitation: InvitationEntity,
    createdBy: AdminEntity
  ) {
    super();
    this.groupName = groupName;
    this.invitation = invitation;
    guests.forEach(guest => this.guests.add(guest));
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
              'modifyBy'
            ].includes(key)
          ) {
            (acm as any)[key] = value;
          }

          return acm;
        }, {} as any);
  }
}
