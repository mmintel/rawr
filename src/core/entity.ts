import { UniqueId } from './unique-entity-id';

interface EntityProps {
  id?: UniqueId;
}

export class Entity<Props extends EntityProps> {
  protected _id: UniqueId;
  protected props: Props;

  constructor(props: Props) {
    this.props = props;

    if (!props.id) {
      this.props.id = UniqueId.create();
    }
  }

  get id(): UniqueId {
    return this.props.id;
  }

  public static isEntity(entity: any): entity is Entity<any> {
    return entity instanceof Entity;
  }

  public equals(object?: Entity<Props>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}

export class MixableEntity<Props extends EntityProps> extends Entity<Props> {
  // ts-mixer requires init function to replace constructor
  protected init(props: Props) {
    this.props = props;

    if (!props.id) {
      this.props.id = UniqueId.create();
    }
  }
}
