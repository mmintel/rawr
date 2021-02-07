import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './interface/user.controller';
import { CommandHandlers } from './application/commands';
import { EventHandlers } from './application/events';
import { QueryHandlers } from './application/queries';
import { UserRepositoryTypeORM } from './infrastructure/typeorm/user.repository';
import { UserFactory } from './domain/users.factory';
import { UserMapperTypeORM } from './infrastructure/typeorm/user.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    UserFactory,
    UserMapperTypeORM,
    UserRepositoryTypeORM,
    UserController,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class UsersModule {}
