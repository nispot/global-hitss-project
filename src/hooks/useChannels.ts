import type { Channel } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getApiDateRange } from '@utils/datesAndTimes';

const fetchChannels = async (): Promise<Channel[]> => {
  const { startDate, endDate } = getApiDateRange();
  const quantity = 200;
  const url = `https://mfwkweb-api.clarovideo.net/services/epg/channel?device_category=web&device_model=web&device_type=web&device_so=Chrome&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.93&region=guatemala&HKS=web61144bb49d549&user_id=54343080&date_from=${startDate}&date_to=${endDate}&quantity=${quantity}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching channels');
  }
  const data = await response.json();
  return data.response.channels;
};

export const useChannels = () => {
  return useQuery({
    queryKey: ['channels'],
    queryFn: fetchChannels,
    staleTime: 1000 * 60 * 5, // Los datos permanecen frescos durante 5 minutos
    gcTime: 1000 * 60 * 10, // Cachea los datos durante 10 minutos (antes era cacheTime)
    refetchOnWindowFocus: false, // No refetch cuando se vuelva al foco
  });
};
