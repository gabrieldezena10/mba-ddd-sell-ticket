import { Customer } from '../custumer.entity';

test('should create a customer entity', () => {
  const customer = Customer.create({
    cpf: '464.886.480-80',
    name: 'John Doe',
  });

  expect(customer).toBeDefined();
  expect(customer.cpf.value).toBe('46488648080');
  expect(customer.name.value).toBe('John Doe');
});
