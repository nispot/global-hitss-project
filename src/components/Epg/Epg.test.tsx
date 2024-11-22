import { Channel } from '@/types';
import { useChannels } from '@hooks/useChannels';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import Epg from './Epg';

const mockChannels: Channel[] = [
  {
    name: 'Channel 1',
    events: [],
    id: '1',
    number: '',
    image: '',
  },
  {
    name: 'Channel 2',
    events: [],
    id: '2',
    number: '',
    image: '',
  },
];

vi.mock('@hooks/useChannels');
vi.mock('@context/TimeTitlesContext', () => ({
  TimeTitlesProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock('@epgComponents/EventHoverDetails', () => ({
  EventHoverDetails: () => (
    <div data-testid="event-hover-details">Event Hover Details</div>
  ),
}));
vi.mock('@epgComponents/TimesRow', () => ({
  TimesRow: () => <div data-testid="times-row">Times Row</div>,
}));
vi.mock('@epgComponents/ChannelRow', () => ({
  ChannelRow: ({ channel }: { channel: { id: number; name: string } }) => (
    <div data-testid={`channel-row-${channel.id}`}>{channel.name}</div>
  ),
}));

describe('Epg', () => {
  it('renders loading state', () => {
    vi.mocked(useChannels).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof useChannels>);

    render(<Epg />);
    expect(screen.getByText('Cargando Grilla de Canales...')).toBeDefined();
  });

  it('renders error state', () => {
    vi.mocked(useChannels).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as ReturnType<typeof useChannels>);

    render(<Epg />);
    expect(screen.getByText('Error Grilla de Canales :(')).toBeDefined();
  });

  it('renders channels when data is loaded', () => {
    vi.mocked(useChannels).mockReturnValue({
      data: mockChannels,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useChannels>);

    render(<Epg />);
    expect(screen.getByTestId('times-row')).toBeDefined();
    expect(screen.getByTestId('channel-row-1')).toBeDefined();
    expect(screen.getByTestId('channel-row-2')).toBeDefined();
    expect(screen.getByText('Channel 1')).toBeDefined();
    expect(screen.getByText('Channel 2')).toBeDefined();
  });

  it('renders EventHoverDetails component', () => {
    vi.mocked(useChannels).mockReturnValue({
      data: mockChannels,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useChannels>);

    render(<Epg />);
    expect(screen.getByTestId('event-hover-details')).toBeDefined();
  });
});
