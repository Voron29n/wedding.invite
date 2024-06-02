import {
  Entity,
  Enum,
  ManyToOne,
  OneToOne,
  Property,
  wrap
} from '@mikro-orm/core';
import { BaseEntity, GuestEntity, InviteGroupEntity } from '@entities';
import { Role, StartPlace, SurveyResponsesType } from '@types';

@Entity({
  tableName: 'survey_responses'
})
export class SurveyResponsesEntity extends BaseEntity {
  @OneToOne(() => InviteGroupEntity, { hidden: true })
  inviteGroup: InviteGroupEntity;

  @Property({ default: [], columnType: 'array' })
  presentGuests: string[];

  @Enum(() => StartPlace)
  startPlace?: StartPlace;

  @Property({ nullable: true, columnType: 'boolean' })
  isPrivateTransport: boolean | null;

  @Property({ nullable: true, columnType: 'array' })
  presentOnSecondDay: string[] | null;

  @Property({ nullable: true, columnType: 'boolean' })
  needSleepPlace?: boolean | null;

  @Property({ default: [], nullable: true, columnType: 'array' })
  likeDrinks?: string[] | null;

  @ManyToOne(() => GuestEntity, {
    nullable: true,
    serializer: value =>
      (value && `${value.firstName} ${value.lastName}`) || null
  })
  createdBy: GuestEntity;

  @ManyToOne(() => GuestEntity, {
    nullable: true,
    serializer: value =>
      (value && `${value.firstName} ${value.lastName}`) || null
  })
  modifyBy?: GuestEntity;

  constructor({
    inviteGroup,
    createdBy,
    presentGuests,
    startPlace,
    isPrivateTransport,
    presentOnSecondDay,
    needSleepPlace,
    likeDrinks
  }: SurveyResponsesType) {
    super();
    this.inviteGroup = inviteGroup;
    this.createdBy = createdBy;
    this.presentGuests = presentGuests;
    this.startPlace = startPlace;
    this.isPrivateTransport = isPrivateTransport;
    this.presentOnSecondDay = presentOnSecondDay;
    this.needSleepPlace = needSleepPlace;
    this.likeDrinks = likeDrinks;
  }

  toJSON(args?: string[]) {
    const object = wrap(this).toObject();

    return args?.includes(Role.admin)
      ? object
      : Object.entries(object).reduce((acm, [key, value]) => {
          // skip the fields: createdAt, updatedAt, _id, id
          if (!['id', '_id'].includes(key)) {
            (acm as any)[key] = value;
          }

          return acm;
        }, {});
  }
}
