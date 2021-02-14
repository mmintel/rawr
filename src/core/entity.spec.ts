import { Entity } from './entity';
import { UniqueId } from './unique-id.value-object';

describe('Entity', () => {
  it('should be equal if id is equal', () => {
    const firstEntity = new Entity({ id: new UniqueId({ value: '1' }) });
    const secondEntity = new Entity({ id: new UniqueId({ value: '1' }) });
    expect(firstEntity.equals(secondEntity)).toBe(true);
  });

  it('should not be equal if id is different', () => {
    const firstEntity = new Entity({ id: new UniqueId({ value: '1' }) });
    const secondEntity = new Entity({ id: new UniqueId({ value: '2' }) });
    expect(firstEntity.equals(secondEntity)).toBe(false);
  });
});
