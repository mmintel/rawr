import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { IdGenerator, UuidGenerator } from 'src/shared';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepositoryMemoryAdapter } from './repository/adapters/user.repository.memory';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [CqrsModule],
  controllers: [BooksController],
  providers: [
    {
      provide: IdGenerator,
      useClass: UuidGenerator,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryMemoryAdapter,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class UsersModule {}
