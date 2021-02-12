import { ValueObject } from 'src/core/value-object';
import bcrypt from 'bcrypt';

interface UserPasswordProps {
  encrypted: string;
  salt?: string;
  createdAt?: Date;
  comparedAt?: Date;
}

export interface AnemicUserPassword {
  readonly encrypted: string;
  readonly salt: string;
  readonly createdAt: Date;
  readonly comparedAt: Date;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(props: UserPasswordProps) {
    super(props);

    if (!props.createdAt) {
      this.props.createdAt = new Date();
    }

    if (!props.salt) {
      this.props.salt = this.generateSalt();
      this.props.encrypted = this.hashPassword(
        this.props.encrypted,
        this.props.salt,
      );
    }
  }

  private hashPassword(password: string, salt: string): string {
    return bcrypt.hashPassword(password, salt);
  }

  private generateSalt() {
    return bcrypt.generateSalt();
  }

  public compare(password: string): boolean {
    const result = bcrypt.compareSync(password, this.props.encrypted);
    this.props.comparedAt = new Date();
    return result;
  }

  public toAnemic(): AnemicUserPassword {
    return {
      encrypted: this.props.encrypted,
      salt: this.props.salt,
      createdAt: this.props.createdAt,
      comparedAt: this.props.comparedAt,
    };
  }

  static create(props: UserPasswordProps): UserPassword {
    return new UserPassword(props);
  }
}
