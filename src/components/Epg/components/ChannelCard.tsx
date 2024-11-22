import { Channel } from '@/types';
import { LazyImage } from '@epgComponents/LazyImage';
interface ChannelCardProps {
  channel: Channel;
}

export const ChannelCard = ({ channel }: ChannelCardProps) => {
  return (
    <div
      className="sticky left-0 bg-[#1A1A1A] text-white font-bold flex items-center justify-between p-2 border-4 border-r-8 border-[#000000] z-10"
      style={{ width: '150px' }}
    >
      <div className="items-start flex h-full">{channel.number}</div>
      <LazyImage
        src={channel.image}
        alt={channel.name}
        className="w-[100px] object-contain"
      />
    </div>
  );
};
