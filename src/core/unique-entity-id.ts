import { ValueObject } from 'src/core/value-object';
import { v4 as uuid } from 'uuid';

interface UniqueIdProps {
  value: string;
}

export type AnemicUniqueId = string;

export class UniqueId extends ValueObject<UniqueIdProps> {
  public toAnemic(): AnemicUniqueId {
    return this.props.value;
  }

  static create(props?: UniqueIdProps): UniqueId {
    const data = { ...props };

    if (!data?.value) {
      data.value = uuid();
    }
    return new UniqueId(data);
  }
}
