import { ICreateUserDTO } from './dto/create-user.dto';
import { IUpdateUserDTO } from './dto/update-user.dto';
import { IUser } from './user.entity';

export interface IUserService {
  create(payload: ICreateUserDTO): Promise<void>;
  update(id: string, payload: IUpdateUserDTO): Promise<void>;
  remove(id: string): Promise<void>;
  findAll(): Promise<IUser[]>;
  findOne(id: string): Promise<IUser>;
}
