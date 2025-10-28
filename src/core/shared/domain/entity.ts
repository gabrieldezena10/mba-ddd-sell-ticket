export abstract class Entity<IdType> {
  readonly id: IdType;

  abstract toJSON(): any;

  abstract equals(obj: this): boolean;
}
