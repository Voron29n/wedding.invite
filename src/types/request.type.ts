import {
  ValidatedRequest,
  ValidatedRequestSchema
} from 'express-joi-validation';
import { AdminEntity, GuestEntity } from '@entities';

export interface AuthValidatedRequest<T extends ValidatedRequestSchema>
  extends ValidatedRequest<T> {
  admin: AdminEntity;
  guest: GuestEntity;
}
