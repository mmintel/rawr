import { ICommand } from '@nestjs/cqrs';
import { UpdateUserDto } from 'src/modules/users/implementation/dtos/update-user.dto';

export class UpdateUserCommand implements ICommand {
  constructor(public id: string, public payload: UpdateUserDto) {}
}