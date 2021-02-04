import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateUserDTO } from '../../domain/dto/create-user.dto';

export class CreateUserDto implements ICreateUserDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
