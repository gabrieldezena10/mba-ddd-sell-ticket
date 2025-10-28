import { Name } from 'src/core/shared/domain/value-objects/name.value-object';

export type CustomerConstructorInput = {
  id?: string;
  cpf: string;
  name: Name;
};
