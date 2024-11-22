import { useTimeTitles } from '@/hooks/useTimeTitles';
import { Channel, HoveredEvent } from '@/types';
import { ChannelCard } from '@epgComponents/ChannelCard';
import { EventCard } from '@epgComponents/EventCard';

interface ChannelRowProps {
  channel: Channel;
  setHoveredEvent: (event: HoveredEvent | null) => void;
}

export const ChannelRow = ({ channel, setHoveredEvent }: ChannelRowProps) => {
  const timeTitles = useTimeTitles();
  return (
    <div
      key={channel.id}
      className="relative flex"
      style={{
        height: '80px',
        width: `${150 + timeTitles.length * 150}px`,
      }}
      data-testid={`channel-row-${channel.id}`}
    >
      <ChannelCard channel={channel} />

      <div className="relative flex-grow">
        {channel.events.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            setHoveredEvent={setHoveredEvent}
          />
        ))}
      </div>
    </div>
  );
};
