import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './interface/users.controller';
import { CommandHandlers } from './application/commands';
import { EventHandlers } from './application/events';
import { IUserRepository } from './domain/user.repository';
import { QueryHandlers } from './application/queries';
import { UserRepositoryMemory } from './implementation/repositories/memory/user.repository.memory';
@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepositoryMemory,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class UsersModule {}
