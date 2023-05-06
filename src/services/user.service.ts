import { HttpCode, HttpException } from '../exceptions/HttpException';
import { User } from '../domains/user.domain';
import { CreateUserDTO } from '../dtos/user/createUser.dto';
import { UpdateUserDTO } from '../dtos/user/updateUser.dto';
import { TKeysPropsUpdateUser } from '../utils/TTypes';

class UserService {
  private users: User[] = [];

  create(props: CreateUserDTO): User {
    const { email, name } = props;
    
    const user = new User({ email, name });

    this.users.push(user);

    return user;
  }

  listAll(): User[] {
    return this.users;
  }

  listById(id: string): User {
    const user = this.users.find((_user) => _user.id === id);

    if (!user) {
      throw new HttpException({
        message: 'User not found!',
        statusCode: HttpCode.NOT_FOUND,
      });
    }

    return user;
  }

  update(id: string, props: UpdateUserDTO): User {
    const user = this.listById(id);

    const dataToUpdate = {};

    const keysUpdateUser: TKeysPropsUpdateUser[] = Object.keys(
      props
    ) as TKeysPropsUpdateUser[];
    // ['name', 'email']

    keysUpdateUser.forEach((key) => {
      const value = props[key];

      if (value)
        Object.assign(dataToUpdate, { ...dataToUpdate, [key]: props[key] });
    });

    Object.assign(user, dataToUpdate);

    const indexUser = this.users.findIndex((_user) => _user.id === id);

    this.users[indexUser] = user;

    return user;
  }

  delete(id: string): User[] {
    const user = this.listById(id);

    const indexUser = this.users.findIndex((_user) => _user.id === user.id);

    return this.users.splice(-indexUser, 1);
    // [0,1,2,3,4,5]
    // splice(2,2)
  }
}

const userService = new UserService();

export { userService };
