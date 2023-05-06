export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT=409,
  INTERNAL_SERVER_ERROR = 500,
}

interface httpExceptionArgs {
  name?: string;
  statusCode: HttpCode;
  message: string;
}

export class HttpException extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;
  public readonly isOperational: boolean = true;

  constructor(args: httpExceptionArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || 'Error';
    this.httpCode = args.statusCode;

    Error.captureStackTrace(this);
  }
}
