import { AggregateRoot } from 'src/core/shared/domain/aggregate-root';
import { Uuid } from 'src/core/shared/domain/value-objects/uuid.value-object';
import { Event } from './event.entity';

export class PartnerId extends Uuid {}

export type InitEventCommand = {
  name: string;
  description?: string | null;
  date: Date;
};

export type PartnerConstructorProps = {
  id?: PartnerId | string;
  name: string;
};

export class Partner extends AggregateRoot<PartnerId> {
  id: PartnerId;
  name: string;

  constructor(props: PartnerConstructorProps) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new PartnerId(props.id)
        : (props.id ?? new PartnerId());
    this.name = props.name;
  }

  static create(command: { name: string }) {
    const partner = new Partner({
      name: command.name,
    });
    return partner;
  }

  initEvent(command: InitEventCommand) {
    const event = Event.create({
      ...command,
      partner_id: this.id,
    });
    return event;
  }

  equals(obj: this): boolean {
    if (obj === null || obj === undefined) return false;
    if (obj.id === undefined) return false;
    if (obj.constructor.name !== this.constructor.name) return false;
    return this.id.equals(obj.id);
  }

  toJSON() {
    return {
      id: this.id.value,
      name: this.name,
    };
  }
}
