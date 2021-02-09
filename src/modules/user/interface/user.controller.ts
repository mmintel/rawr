import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserCommand } from '../domain/commands/create-user.command';
import { ListUsersQuery } from '../domain/queries/list-users.query';
import { GetUserQuery } from '../domain/queries/get-user.query';
import { UpdateUserCommand } from '../domain/commands/update-user.command';
import { DeleteUserCommand } from '../domain/commands/delete-user.command';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ description: 'Create User' })
  @ApiResponse({ status: 200, description: 'Create User.' })
  @Post()
  async create(@Body() payload: CreateUserDto) {
    await this.commandBus.execute(new CreateUserCommand(payload));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new ListUsersQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.commandBus.execute(new UpdateUserCommand(id, updateUserDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteUserCommand(id));
  }
}
