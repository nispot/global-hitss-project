import { useTimeTitles } from '@hooks/useTimeTitles';
import { fireEvent, render, screen } from '@testing-library/react';
import * as datesAndTimes from '@utils/datesAndTimes';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EventCard } from './EventCard';

vi.mock('@hooks/useTimeTitles');
vi.mock('@utils/datesAndTimes', async () => {
  const actual = await vi.importActual('@utils/datesAndTimes');
  return {
    ...actual,
    calculateProportionalPosition: vi.fn(),
    formatTime: vi.fn(),
    formatDuration: vi.fn(),
  };
});

describe('EventCard', () => {
  const mockEvent = {
    id: '1',
    name: 'Test Event',
    description: 'Test Description',
    unix_begin: 1625097600,
    unix_end: 1625101200,
    duration: '3600',
    date_begin: `${new Date(1625097600 * 1000)}`,
    date_end: `${new Date(1625101200 * 1000)}`,
  };

  const mockSetHoveredEvent = vi.fn();

  beforeEach(() => {
    vi.mocked(useTimeTitles).mockReturnValue([
      { label: '00:00', timestamp: 1625097600 },
      { label: '01:00', timestamp: 1625101200 },
      { label: '02:00', timestamp: 1625104800 },
    ]);
    vi.mocked(datesAndTimes.calculateProportionalPosition).mockReturnValue({
      startPosition: 0,
      width: 300,
    });
    vi.mocked(datesAndTimes.formatTime).mockReturnValue('00:00');
    vi.mocked(datesAndTimes.formatDuration).mockReturnValue('1h');
  });

  it('renders event name and time', () => {
    render(
      <EventCard event={mockEvent} setHoveredEvent={mockSetHoveredEvent} />
    );

    expect(screen.getByText('Test Event')).toBeDefined();
    expect(screen.getByText('00:00 - 00:00')).toBeDefined();
  });

  it('applies correct styles based on calculateProportionalPosition', () => {
    render(
      <EventCard event={mockEvent} setHoveredEvent={mockSetHoveredEvent} />
    );

    const eventCard = screen.getByText('Test Event').parentElement;
    expect(eventCard).toBeDefined();
    expect(eventCard?.style.left).toBe('0px');
    expect(eventCard?.style.width).toBe('300px');
  });

  it('calls setHoveredEvent on mouse enter and leave', () => {
    render(
      <EventCard event={mockEvent} setHoveredEvent={mockSetHoveredEvent} />
    );

    const eventCard = screen.getByText('Test Event').closest('div');
    expect(eventCard).toBeDefined();

    fireEvent.mouseEnter(eventCard as HTMLElement);
    expect(mockSetHoveredEvent).toHaveBeenCalledWith({
      name: 'Test Event',
      timeInfo: '00:00hs. a 00:00hs. 1h',
      description: 'Test Description',
    });

    fireEvent.mouseLeave(eventCard as HTMLElement);
    expect(mockSetHoveredEvent).toHaveBeenCalledWith(null);
  });
});
