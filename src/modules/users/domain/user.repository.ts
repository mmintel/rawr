import { IUpdateUserDTO } from './dto/update-user.dto';
import { IUser } from './user.entity';

export abstract class IUserRepository {
  abstract findOneById(id: string): Promise<IUser>;
  abstract findAll(): Promise<IUser[]>;

  abstract save(user: IUser): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, payload: IUpdateUserDTO): Promise<void>;
}
