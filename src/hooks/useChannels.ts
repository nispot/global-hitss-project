import type { Channel } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getApiDateRange } from '@utils/datesAndTimes';

const fetchChannels = async (): Promise<Channel[]> => {
  const { startDate, endDate } = getApiDateRange();
  const quantity = 200;
  const url = `https://mfwkweb-api.clarovideo.net/services/epg/channel?device_category=web&device_model=web&device_type=web&device_so=Chrome&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.93&region=guatemala&HKS=web61144bb49d549&user_id=54343080&date_from=${startDate}&date_to=${endDate}&quantity=${quantity}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error fetching channels');
    }
    const data = await response.json();
    return data.response.channels;
  } catch {
    throw new Error('Error fetching channels');
  }
};

export const channelsQueryOptions = {
  staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
  gcTime: 1000 * 60 * 10, // Cache data for 10 minutes
  refetchOnWindowFocus: false, // Don't refetch when window regains focus
  retry: false, // Disable retries to make error testing easier
};

export const useChannels = () => {
  return useQuery({
    queryKey: ['channels'],
    queryFn: fetchChannels,
    ...channelsQueryOptions,
  });
};
