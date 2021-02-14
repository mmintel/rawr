import { validateSync } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

describe('UpdateUserDTO', () => {
  it('should pass with all data passed', () => {
    const dto = new UpdateUserDto();
    dto.firstName = 'foo';
    dto.lastName = 'bar';
    dto.email = 'foo@bar';

    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass with a subset of data passed', () => {
    const dto = new UpdateUserDto();
    dto.firstName = 'foo';

    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('should decline with missing data', () => {
    const dto = new CreateUserDto();
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
