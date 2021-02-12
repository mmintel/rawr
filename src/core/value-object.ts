import { shallowEqual } from 'shallow-equal-object';

export class ValueObject<Props> {
  protected props: Props;

  constructor(props: Props) {
    this.props = props;
  }

  equals(object?: ValueObject<Props>): boolean {
    if (object === null || object === undefined) {
      return false;
    }
    if (object.props === undefined) {
      return false;
    }
    return shallowEqual(this.props, object.props);
  }
}
