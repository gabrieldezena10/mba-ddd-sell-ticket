import { Cpf } from 'src/core/shared/domain/value-objects/cpf.value-object';
import { Name } from 'src/core/shared/domain/value-objects/name.value-object';
import { CustumerId } from './customer.entity';
import { EventSection, EventSectionId } from './event-section';
import { EventSpot, EventSpotId } from './event-spot';
import { EventId } from './event.entity';
import { PartnerId } from './partner.entity';

// Customer
export type CustomerConstructorInput = {
  id?: CustumerId | string;
  cpf: Cpf;
  name: Name;
};

// Event
export type CreateEventCommand = {
  name: string;
  description?: string | null;
  date: Date;
  partner_id: PartnerId;
};

export type AddSectionCommand = {
  name: string;
  description?: string | null;
  total_spots: number;
  price: number;
};

export type EventConstructorProps = {
  id?: EventId | string;
  name: string;
  description: string | null;
  date: Date;
  is_published: boolean;
  total_spots: number;
  total_spots_reserved: number;
  partner_id: PartnerId | string;
  sections?: Set<EventSection>;
};

// EventSection
export type EventSectionCreateCommand = {
  name: string;
  description?: string | null;
  total_spots: number;
  price: number;
};

export type EventSectionConstructorProps = {
  id?: EventSectionId | string;
  name: string;
  description: string | null;
  is_published: boolean;
  total_spots: number;
  total_spots_reserved: number;
  price: number;
  spots?: Set<EventSpot>;
};

// EventSpot
export type EventSpotConstructorProps = {
  id?: EventSpotId | string;
  location: string | null;
  is_reserved: boolean;
  is_published: boolean;
};
