import { Cpf } from 'src/core/shared/domain/value-objects/cpf.value-object';
import { Name } from 'src/core/shared/domain/value-objects/name.value-object';

export type CustomerConstructorInput = {
  id?: string;
  cpf: Cpf;
  name: Name;
};
