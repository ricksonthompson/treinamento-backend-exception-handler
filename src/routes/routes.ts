import 'express-async-errors';
import { NextFunction, Request, Response, Router } from 'express';
import { errorHandler } from '../exceptions/ErrorHandler';
import userController from '../controllers/user.controller';
import { ValidatePayloadMiddleware } from '../middlewares/validatePayload.middleware';
import {
  CreateUserSchema,
  UpdateUserSchema,
} from '../schemas/user/user.schema';

const routes = Router();

routes.post(
  '/users',
  ValidatePayloadMiddleware(CreateUserSchema),
  userController.create
);

routes.get('/users', userController.getAll);

routes.get('/users/:id', userController.getById);

routes.put(
  '/users/:id',
  ValidatePayloadMiddleware(UpdateUserSchema),
  userController.update
);

routes.delete('/users/:id', userController.delete);

routes.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error encountered:', err.message || err);

  next(err);
});

routes.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
  next(err);
});

export default routes;
