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
  user: {
    name: string;
  };
}

export interface HealthCheckData {
  status: string;
}

export interface ResponseEntity<Type> {
  data: Type | null;
  error: ErrorMessage | null;
}
