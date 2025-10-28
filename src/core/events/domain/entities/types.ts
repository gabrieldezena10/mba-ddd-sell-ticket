import { Cpf } from 'src/core/shared/domain/value-objects/cpf.value-object';
import { Name } from 'src/core/shared/domain/value-objects/name.value-object';
import { CustumerId } from './custumer.entity';

export type CustomerConstructorInput = {
  id?: CustumerId | string;
  cpf: Cpf;
  name: Name;
};
