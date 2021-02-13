import { AnemicUser } from './user.entity';

export interface UserDTO
  extends Omit<AnemicUser, 'password' | 'id' | 'createdAt' | 'updatedAt'> {
  id: string;
  password?: never;
  createdAt?: never;
  updatedAt?: never;
}
