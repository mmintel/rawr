import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../application/events/user-created/user-created.event';
import { UserUpdatedEvent } from '../../application/events/user-updated/user-updated.event';
import { UserDeletedEvent } from '../../application/events/user-deleted/user-deleted.event';
import { UserWelcomedEvent } from '../../application/events/user-welcomed/user-welcomed.event';
import { IUser } from '../../domain/user.entity';

@Entity({ name: 'users' })
export class User extends AggregateRoot implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //@OneToMany(() => Recipe, (recipe) => recipe.user)
  //public recipes?: Recipe[];

  raiseCreateUser() {
    this.apply(new UserCreatedEvent(this.id));
  }

  raiseUpdateUser() {
    this.apply(new UserUpdatedEvent(this.id));
  }

  raiseWelcomeUser() {
    this.apply(new UserWelcomedEvent(this.id));
  }

  raiseDeleteUser() {
    this.apply(new UserDeletedEvent(this.id));
  }
}
