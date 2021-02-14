import { ValueObject } from './value-object';

describe('ValueObject', () => {
  it('should be equal if props are equal', () => {
    const firstValueObject = new ValueObject({ value: 'foo' });
    const secondValueObject = new ValueObject({ value: 'foo' });
    expect(firstValueObject.equals(secondValueObject)).toBe(true);
  });

  it('should not be equal if props are different', () => {
    const firstValueObject = new ValueObject({ value: 'foo' });
    const secondValueObject = new ValueObject({ value: 'bar' });
    expect(firstValueObject.equals(secondValueObject)).toBe(false);
  });
});
