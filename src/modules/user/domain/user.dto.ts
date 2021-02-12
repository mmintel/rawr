import { AnemicUser } from './user.entity';

export interface UserDTO extends Omit<AnemicUser, 'password' | 'id'> {
  id: string;
  password?: never;
}
