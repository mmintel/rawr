import { AggregateRoot as AbstractCqrsAggregateRoot } from '@nestjs/cqrs';
import { mix, settings } from 'ts-mixer';
import { Entity, EntityProps } from './entity';
import { UniqueId } from './unique-id.value-object';

settings.initFunction = 'init';

class CqrsAggregateRoot extends AbstractCqrsAggregateRoot {}

export interface AggregateRoot<Props extends EntityProps>
  extends Entity<Props>,
    AbstractCqrsAggregateRoot {}

@mix(Entity, CqrsAggregateRoot)
export class AggregateRoot<Props> {
  constructor(props: Props) {
    this.init(props);
  }

  protected init(props: Props) {
    this.props = props;

    if (!props.id) {
      this.props.id = UniqueId.create();
    }
  }
}
