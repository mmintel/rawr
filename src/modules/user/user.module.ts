import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './interface/user.controller';
import { CommandHandlers } from './application/command-handlers';
import { EventHandlers } from './application/event-handlers';
import { QueryHandlers } from './application/query-handlers';
import { UserRepositoryTypeORM } from './infrastructure/typeorm/user.repository';
import { UserFactory } from './domain/users.factory';
import { UserMapperTypeORM } from './infrastructure/typeorm/user.mapper';
import { UserApplicationService } from './application/services/user.service';
import { UserRepository } from './domain/user.repository';
import { UserMapper } from './domain/user.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntityTypeORM } from './infrastructure/typeorm/user.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntityTypeORM])],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryTypeORM,
    },
    {
      provide: UserMapper,
      // TODO normal injection doesn't work, find out why
      useValue: new UserMapperTypeORM(new UserFactory()),
    },
    UserFactory,
    UserController,
    UserApplicationService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class UsersModule {}
