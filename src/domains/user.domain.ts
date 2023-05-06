import { v4 as uuid } from 'uuid';

export class User {
  id: string;
  name!: string;
  email!: string;

  constructor(props: Omit<User, 'id'>) {
    Object.assign(this, props);
    this.id = uuid();
  }
}
