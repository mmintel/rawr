import { ICommand } from '@nestjs/cqrs';
import { UpdateUserDto } from 'src/modules/user/interface/dtos/update-user.dto';

export class UpdateUserCommand implements ICommand {
  constructor(public id: string, public payload: Partial<UpdateUserDto>) {}
}
