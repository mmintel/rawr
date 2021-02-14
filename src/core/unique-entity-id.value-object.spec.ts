import { UniqueId } from './unique-id.value-object';

describe('UniqueId', () => {
  it('should generate a unique id if none passed', () => {
    const id = UniqueId.create();
    const uuidRegex = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    );
    expect(id.value).toMatch(uuidRegex);
  });

  it('should use passed id', () => {
    const id = UniqueId.create({ value: '1' });
    expect(id.value).toEqual('1');
  });

  it('should return the anemic object', () => {
    const id = UniqueId.create({ value: '1' });
    expect(id.toAnemic()).toEqual({ value: '1' });
  });
});
