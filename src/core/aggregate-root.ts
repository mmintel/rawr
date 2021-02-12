import { AggregateRoot as AbstractCqrsAggregateRoot } from '@nestjs/cqrs';
import { mix } from 'ts-mixer';
import { MixableEntity } from './entity';

class CqrsAggregateRoot extends AbstractCqrsAggregateRoot {}

export interface AggregateRoot<Props>
  extends MixableEntity<Props>,
    AbstractCqrsAggregateRoot {}

@mix(MixableEntity, CqrsAggregateRoot)
export class AggregateRoot<Props> {
  constructor(props: Props) {
    this.init(props);
  }
}
