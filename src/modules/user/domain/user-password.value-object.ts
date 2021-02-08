import { ValueObject } from 'src/core/value-object';

interface UserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(props: UserPasswordProps) {
    super(props);
  }

  get value() {
    return this.props.value;
  }

  static create(props: UserPasswordProps): UserPassword {
    return new UserPassword(props);
  }
}
