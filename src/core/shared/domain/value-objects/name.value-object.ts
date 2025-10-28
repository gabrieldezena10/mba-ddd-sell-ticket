import { ValueObject } from './value-object';

export class Name extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.isValid();
  }

  public isValid() {
    return this.value.length > 3;
  }
}
