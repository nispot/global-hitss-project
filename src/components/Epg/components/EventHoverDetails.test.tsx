import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EventHoverDetails } from './EventHoverDetails';

describe('EventHoverDetails', () => {
  const mockHoveredEvent = {
    name: 'Test Event',
    timeInfo: '20:00 - 21:00',
    description: 'This is a test event description',
  };

  it('renders default message when no event is hovered', () => {
    render(<EventHoverDetails hoveredEvent={null} />);
    expect(
      screen.getByText('Pasa el mouse sobre un programa para ver los detalles')
    ).toBeDefined();
  });

  it('renders event details when an event is hovered', () => {
    render(<EventHoverDetails hoveredEvent={mockHoveredEvent} />);
    expect(screen.getByText('Test Event')).toBeDefined();
    expect(screen.getByText('20:00 - 21:00')).toBeDefined();
    expect(screen.getByText('This is a test event description')).toBeDefined();
  });

  it('renders "Sin descripción" when description is same as name', () => {
    const eventWithoutDescription = {
      ...mockHoveredEvent,
      description: mockHoveredEvent.name,
    };
    render(<EventHoverDetails hoveredEvent={eventWithoutDescription} />);
    expect(screen.getByText('Sin descripción')).toBeDefined();
  });

  it('applies correct styles to the container', () => {
    render(<EventHoverDetails hoveredEvent={null} />);
    const container = screen
      .getByText('Pasa el mouse sobre un programa para ver los detalles')
      .closest('div');
    expect(container).toBeDefined();
    expect(container?.className).toContain(
      'min-h-48 h-auto p-4 bg-gray-800 text-white flex items-center px-4'
    );
  });
});
