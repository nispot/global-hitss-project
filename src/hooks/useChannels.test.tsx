import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { channelsQueryOptions, useChannels } from './useChannels';

vi.mock('@utils/datesAndTimes', () => ({
  getApiDateRange: vi.fn(() => ({
    startDate: '2023-01-01',
    endDate: '2023-01-02',
  })),
}));

global.fetch = vi.fn();

describe('useChannels', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  it('fetches channels successfully', async () => {
    const mockChannels = [
      {
        id: '1',
        name: 'Channel 1',
        events: [],
        number: '1',
        image: '',
      },
      { id: '2', name: 'Channel 2', events: [], number: '2', image: '' },
    ];

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: { channels: mockChannels } }),
    } as Response);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useChannels(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockChannels);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://mfwkweb-api.clarovideo.net/services/epg/channel'
      )
    );
  });

  it('handles fetch error', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('API error'));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useChannels(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error('Error fetching channels'));
  });

  it('uses correct query options', async () => {
    expect(channelsQueryOptions).toEqual({
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: false,
    });
  });
});
