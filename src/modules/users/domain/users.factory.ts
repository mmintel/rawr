import { ICreateUserDTO } from './dto/create-user.dto';
import { IUser } from './user.entity';

interface IFactory<T, DTO> {
  create(payload: DTO): T;
}

export type IUserFactory = IFactory<IUser, ICreateUserDTO>;
