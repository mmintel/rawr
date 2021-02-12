import { Column } from 'typeorm';
import { AnemicUserPassword } from '../../domain/user-password.value-object';

export default class PasswordEntityTypeORM implements AnemicUserPassword {
  constructor(props: AnemicUserPassword) {
    Object.assign(this, props);
  }

  @Column()
  public encrypted!: string;

  @Column()
  public salt!: string;

  @Column()
  public createdAt!: Date;

  @Column()
  public comparedAt!: Date;
}
