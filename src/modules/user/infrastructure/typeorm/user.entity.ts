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
export class UserEntityTypeORM {
  constructor(props: AnemicUser) {
    if (props) {
      this.id = props.id.value;
      this.username = props.username;
      this.email = props.email;
      this.firstName = props.firstName;
      this.lastName = props.lastName;
      this.createdAt = props.createdAt;
      this.updatedAt = props.updatedAt;
      this.password = props.password;
    }
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
