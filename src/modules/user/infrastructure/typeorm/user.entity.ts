import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

interface UserProps {
  id?: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Entity({ name: 'users' })
export class UserEntityTypeORM {
  constructor(props: UserProps) {
    Object.assign(this, props);
  }

  @PrimaryColumn()
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //@OneToMany(() => Recipe, (recipe) => recipe.user)
  //public recipes?: Recipe[];
}
