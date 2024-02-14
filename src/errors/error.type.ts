export class HTTPError extends Error {
  statusCode: number;

  constructor(message: string, name: string, statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends HTTPError {
  constructor(message: string) {
    super(message, 'BadRequestError', 400);
  }
}

export class NotAuthorisedError extends HTTPError {
  constructor(message: string) {
    super(message, 'NotAuthorisedError', 401);
  }
}

export class ForbiddenError extends HTTPError {
  constructor(message: string) {
    super(message, 'ForbiddenError', 403);
  }
}

export class NotFoundError extends HTTPError {
  constructor(message: string) {
    super(message, 'NotFoundError', 404);
  }
}

export class InternalServerError extends HTTPError {
  constructor(message: string = '') {
    super(
      `Internal Server error${message && ` with next error: ${message}`}`,
      'InternalServerError',
      500
    );
  }
}
