import { randomUUID } from 'crypto';
import { AggregateRoot } from 'src/core/shared/domain/aggregate-root';
import { Name } from 'src/core/shared/domain/value-objects/name.value-object';
import { CustomerConstructorInput } from './types';

export class Customer extends AggregateRoot {
  id: string;
  cpf: string;
  name: Name;

  constructor(inputDto: CustomerConstructorInput) {
    super();
    this.id = inputDto.id ?? randomUUID();
    this.cpf = inputDto.cpf;
    this.name = inputDto.name;
  }

  static create(command: { cpf: string; name: Name }) {
    return new Customer(command);
  }

  public toJSON() {
    return {
      id: this.id,
      cpf: this.cpf,
      name: this.name,
    };
  }
}
