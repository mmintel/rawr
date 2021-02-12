import { ValueObject } from 'src/core/value-object';
import { v4 as uuid } from 'uuid';

interface UniqueIdProps {
  value: string;
}

export interface AnemicUniqueId {
  readonly value: string;
}

export class UniqueId extends ValueObject<UniqueIdProps> {
  public toAnemic(): AnemicUniqueId {
    return {
      value: this.props.value,
    };
  }

  static create(props?: UniqueIdProps): UniqueId {
    if (!props?.value) {
      props.value = uuid();
    }
    return new UniqueId(props);
  }
}
