import { Response } from 'express';
import { HttpException, HttpCode } from './HttpException';

class ErrorHandler {
  public handleError(error: Error | HttpException, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as HttpException, response);
    } else {
      this.handleUntrustedError(error, response);
    }
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof HttpException) {
      return error.isOperational;
    }

    return false;
  }

  private handleTrustedError(error: HttpException, response: Response): void {
    response.status(error.httpCode).json({ message: error.message });
  }

  private handleUntrustedError(
    error: Error | HttpException,
    response?: Response
  ): void {
    if (response) {
      response
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }

    console.log('Application encountered an untrusted error.');
    console.log(error);
    process.exit();
  }
}

export const errorHandler = new ErrorHandler();
