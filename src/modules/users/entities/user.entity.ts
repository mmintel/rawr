import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class User {
  readonly id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}
