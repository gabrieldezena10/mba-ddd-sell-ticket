import { AggregateRoot } from 'src/core/shared/domain/aggregate-root';
import { Cpf } from 'src/core/shared/domain/value-objects/cpf.value-object';
import { Name } from 'src/core/shared/domain/value-objects/name.value-object';
import { Uuid } from 'src/core/shared/domain/value-objects/uuid.value-object';
import { CustomerConstructorInput } from './types';

export class CustumerId extends Uuid {}

export class Customer extends AggregateRoot<CustumerId> {
  id: CustumerId;
  cpf: Cpf;
  name: Name;

  constructor(inputDto: CustomerConstructorInput) {
    super();
    this.id =
      typeof inputDto.id === 'string'
        ? new CustumerId(inputDto.id)
        : (inputDto.id ?? new CustumerId());
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
      id: this.id.toString(),
      cpf: this.cpf,
      name: this.name,
    };
  }

  equals(obj: this): boolean {
    if (obj === null || obj === undefined) return false;
    if (obj.id === undefined) return false;
    if (obj.constructor.name !== this.constructor.name) return false;
    return this.id.equals(obj.id);
  }
}
