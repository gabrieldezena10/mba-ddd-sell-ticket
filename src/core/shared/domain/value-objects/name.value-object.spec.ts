import { Name } from './name.value-object';

test('should create a name value object', () => {
  const name = new Name('John Doe');
  expect(name.value).toBe('John Doe');
});
