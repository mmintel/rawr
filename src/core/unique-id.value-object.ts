import { ValueObject } from 'src/core/value-object';
import { v4 as uuid } from 'uuid';

interface UniqueIdProps {
  value: string;
}

export type AnemicUniqueId = {
  value: string;
};

export class UniqueId extends ValueObject<UniqueIdProps> {
  get value(): string {
    return this.props.value;
  }

  public toAnemic(): AnemicUniqueId {
    return this.props;
  }

  static create(props?: UniqueIdProps): UniqueId {
    const data = { ...props };

    if (!data?.value) {
      data.value = uuid();
    }
    return new UniqueId(data);
  }
}
