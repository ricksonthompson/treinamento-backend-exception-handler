import { Request, Response } from 'express';
import { userService } from '../services/user.service';

class UserController {
  async create(req: Request, res: Response) {
    const { email, name } = req.body;

    const user = userService.create({
      email,
      name,
    });

    res.status(201).json(user);
  }

  async getAll(req: Request, res: Response) {
    const users = userService.listAll();

    res.status(200).json(users);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const user = userService.listById(id);

    res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = userService.update(id, { email, name });

    res.status(200).json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const user = userService.delete(id);

    res.status(200).json(user);
  }
}

export default new UserController();
