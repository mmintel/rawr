import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { AnemicUser } from '../../domain/user.entity';
import PasswordEntityTypeORM from './password.entity';

@Entity({ name: 'users' })
export class UserEntityTypeORM implements AnemicUser {
  constructor(props: AnemicUser) {
    Object.assign(this, props);
  }

  @PrimaryColumn()
  id!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column(() => PasswordEntityTypeORM)
  password!: PasswordEntityTypeORM;
}
