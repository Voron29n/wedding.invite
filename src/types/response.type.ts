import { Role } from '@src/types/user.type';

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

type ErrorMessage = Pick<ErrorResponse, 'message'>;

export interface RemoveResponseData {
  success: boolean;
}

export interface LoginTokenData {
  accessToken: string;
  expirationTime: string;
  name: string;
  role: Role;
  id: string;
}

export interface HealthCheckData {
  status: string;
}

export interface ResponseEntity<Type> {
  data: Type | null;
  error: ErrorMessage | null;
}
