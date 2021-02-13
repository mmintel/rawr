import { UniqueId } from './unique-entity-id';

export interface EntityProps {
  id?: UniqueId;
}

export class Entity<Props extends EntityProps> {
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

    return this.id.equals(object.id);
  }
}
