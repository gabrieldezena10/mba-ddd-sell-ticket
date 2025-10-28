import { Customer } from 'src/core/events/domain/entities/custumer.entity';
import { Name } from './name.value-object';

test('should create a name value object', () => {
  const name = new Name('John Doe');
  expect(name.value).toBe('John Doe');

  const custumer = new Customer({
    name,
    cpf: '12345678901',
  });

  custumer.name = new Name('Jane Doe');
  expect(custumer.name.value).toBe('Jane Doe');
});
