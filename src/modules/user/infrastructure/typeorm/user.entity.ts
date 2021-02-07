import { User } from 'src/modules/user/domain/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntityTypeORM {
  constructor(user: User) {
    Object.assign(this, user);
  }

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
}
