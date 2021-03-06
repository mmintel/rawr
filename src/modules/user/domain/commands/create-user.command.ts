import { CreateUserDto } from '../../interface/dtos/create-user.dto';
import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(public payload: CreateUserDto) {}
}
