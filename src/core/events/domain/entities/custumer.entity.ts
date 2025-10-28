import { randomUUID } from 'crypto';
import { AggregateRoot } from 'src/core/shared/domain/aggregate-root';
import { Cpf } from 'src/core/shared/domain/value-objects/cpf.value-object';
import { Name } from 'src/core/shared/domain/value-objects/name.value-object';
import { CustomerConstructorInput } from './types';

export class Customer extends AggregateRoot {
  id: string;
  cpf: Cpf;
  name: Name;

  constructor(inputDto: CustomerConstructorInput) {
    super();
    this.id = inputDto.id ?? randomUUID();
    this.cpf = inputDto.cpf;
    this.name = inputDto.name;
  }

  static create(command: { cpf: string; name: string }) {
    return new Customer({
      cpf: new Cpf(command.cpf),
      name: new Name(command.name),
    });
  }

  public toJSON() {
    return {
      id: this.id,
      cpf: this.cpf,
      name: this.name,
    };
  }
}
