import { EventSection } from '../event-section';
import { EventSpot } from '../event-spot';
import { Event, EventId } from '../event.entity';
import { PartnerId } from '../partner.entity';

describe('Event Entity Unit Tests', () => {
  it('deve criar um evento', () => {
    const event = Event.create({
      name: 'Evento 1',
      description: 'Descrição do evento 1',
      date: new Date(),
      partner_id: new PartnerId(),
    });

    expect(event).toBeInstanceOf(Event);
    expect(event.id).toBeDefined();
    expect(event.id).toBeInstanceOf(EventId);
    expect(event.name).toBe('Evento 1');
    expect(event.description).toBe('Descrição do evento 1');
    expect(event.date).toBeInstanceOf(Date);
    expect(event.partner_id).toBeInstanceOf(PartnerId);

    const section = EventSection.create({
      name: 'Seção 1',
      price: 10,
      total_spots: 100,
      description: 'Descrição da seção 1',
    });

    event.sections.add(section);

    expect(event.sections.size).toBe(1);
    expect(event.sections.has(section)).toBe(true);

    const spot = EventSpot.create();

    section.spots.add(spot);

    expect(section.spots.size).toBe(1);
    expect(section.spots.has(spot)).toBe(true);
  });
});
