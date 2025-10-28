import { Cpf } from 'src/core/shared/domain/value-objects/cpf.value-object';
import { Name } from 'src/core/shared/domain/value-objects/name.value-object';
import { Customer, CustumerId } from '../customer.entity';

test('should create a customer entity', () => {
  const customer = Customer.create({
    cpf: '464.886.480-80',
    name: 'John Doe',
  });

  expect(customer).toBeInstanceOf(Customer);
  expect(customer.id).toBeDefined();
  expect(customer.id).toBeInstanceOf(CustumerId);
  expect(customer.cpf.value).toBe('46488648080');
  expect(customer.name.value).toBe('John Doe');

  const newCustomer = new Customer({
    id: new CustumerId(customer.id.value),
    cpf: new Cpf('910.398.720-50'),
    name: new Name('Jane Doe'),
  });

  expect(newCustomer).toBeInstanceOf(Customer);
  expect(newCustomer.id).toBeInstanceOf(CustumerId);
  expect(newCustomer.cpf.value).toBe('91039872050');
  expect(newCustomer.name.value).toBe('Jane Doe');
});
