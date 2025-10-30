import { Event, EventId } from '../event.entity';
import { Partner, PartnerId } from '../partner.entity';

describe('Partner Entity Unit Tests', () => {
  it('deve criar um parceiro', () => {
    const partner = Partner.create({
      name: 'Parceiro 1',
    });

    expect(partner).toBeInstanceOf(Partner);
    expect(partner.id).toBeDefined();
    expect(partner.id).toBeInstanceOf(PartnerId);
    expect(partner.name).toBe('Parceiro 1');

    const event = partner.initEvent({
      name: 'Evento 1',
      description: 'Descrição do evento 1',
      date: new Date(),
    });

    expect(event).toBeInstanceOf(Event);
    expect(event.id).toBeDefined();
    expect(event.id).toBeInstanceOf(EventId);
    expect(event.name).toBe('Evento 1');
    expect(event.description).toBe('Descrição do evento 1');
    expect(event.date).toBeInstanceOf(Date);
    expect(event.partner_id).toBe(partner.id);
  });
});
