import { useTimeTitles } from '@/hooks/useTimeTitles';
import { Channel } from '@/types';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ChannelRow } from './ChannelRow';

vi.mock('@/hooks/useTimeTitles');
vi.mock('@epgComponents/ChannelCard', () => ({
  ChannelCard: ({ channel }: { channel: { id: number; name: string } }) => (
    <div data-testid={`channel-card-${channel.id}`}>{channel.name}</div>
  ),
}));
vi.mock('@epgComponents/EventCard', () => ({
  EventCard: ({ event }: { event: { id: number; title: string } }) => (
    <div data-testid={`event-card-${event.id}`}>{event.title}</div>
  ),
}));

describe('ChannelRow', () => {
  const mockChannel: Channel = {
    id: '896',
    name: 'Test Channel',
    events: [
      {
        id: '101',
        name: 'Event 1',
        date_begin: '2021-01-01T00:00:00Z',
        date_end: '2021-01-01T01:00:00Z',
        description: '',
        unix_begin: 0,
        unix_end: 0,
        duration: '',
      },
      {
        id: '102',
        name: 'Event 2',
        date_begin: '2021-01-01T01:00:00Z',
        date_end: '2021-01-01T02:00:00Z',
        description: '',
        unix_begin: 0,
        unix_end: 0,
        duration: '',
      },
    ],
    number: '896',
    image: '',
  };

  const mockSetHoveredEvent = vi.fn();

  beforeEach(() => {
    vi.mocked(useTimeTitles).mockReturnValue([
      {
        label: '00:00',
        timestamp: 0,
      },
      {
        label: '01:00',
        timestamp: 0,
      },
      {
        label: '02:00',
        timestamp: 0,
      },
    ]);
  });

  it('renders channel card and event cards', () => {
    render(
      <ChannelRow channel={mockChannel} setHoveredEvent={mockSetHoveredEvent} />
    );

    expect(screen.getByTestId('channel-card-896')).toBeDefined();
    expect(screen.getByTestId('event-card-101')).toBeDefined();
    expect(screen.getByTestId('event-card-102')).toBeDefined();
  });

  it('applies correct styles based on timeTitles', () => {
    render(
      <ChannelRow channel={mockChannel} setHoveredEvent={mockSetHoveredEvent} />
    );

    const channelRow = screen.getByTestId('channel-row-896');
    expect(channelRow).toBeDefined();
    expect(channelRow.style.height).toBe('80px');
    expect(channelRow.style.width).toBe('600px'); // 150 + 3 * 150 = 600
  });

  it('passes setHoveredEvent to EventCard components', () => {
    render(
      <ChannelRow channel={mockChannel} setHoveredEvent={mockSetHoveredEvent} />
    );

    expect(screen.getAllByTestId(/^event-card-/)).toHaveLength(2);
  });
});
