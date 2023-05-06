import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HttpCode, HttpException } from '../exceptions/HttpException';

export function ValidatePayloadMiddleware(schema: Joi.Schema) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schema.validate(req.body);

    if (error) {
      throw new HttpException({
        statusCode: HttpCode.BAD_REQUEST,
        message: error.details[0].message,
      });
    } else {
      req.body = value;
      next();
    }
  };
}
