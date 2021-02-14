import { validateSync } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDTO', () => {
  it('should pass with correct data', () => {
    const dto = new CreateUserDto();
    dto.firstName = 'foo';
    dto.lastName = 'bar';
    dto.password = '1234';
    dto.username = 'foobar';
    dto.email = 'foo@bar';

    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('should decline with missing data', () => {
    const dto = new CreateUserDto();
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
