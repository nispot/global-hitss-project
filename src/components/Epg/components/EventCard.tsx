import { Event, HoveredEvent } from '@/types';
import { useTimeTitles } from '@hooks/useTimeTitles';
import {
  calculateProportionalPosition,
  formatDuration,
  formatTime,
} from '@utils/datesAndTimes';

interface EventCardProps {
  event: Event;
  setHoveredEvent: (event: HoveredEvent | null) => void;
}

export const EventCard = ({ event, setHoveredEvent }: EventCardProps) => {
  const timeTitles = useTimeTitles();
  const { startPosition, width } = calculateProportionalPosition(
    event.unix_begin,
    event.unix_end,
    timeTitles
  );

  const startTime = formatTime(event.unix_begin);
  const endTime = formatTime(event.unix_end);
  return (
    <div
      style={{
        position: 'absolute',
        left: `${startPosition}px`,
        width: `${width}px`,
        top: '0',
        bottom: '0',
      }}
      className="p-2 border border-[#555555] bg-[#1A1A1A] hover:bg-[#444550] hover:text-white cursor-pointer overflow-hidden"
      onMouseEnter={() =>
        setHoveredEvent({
          name: event.name,
          timeInfo: `${startTime}hs. a ${endTime}hs. ${formatDuration(
            event.duration
          )}`,
          description: event.description,
        })
      }
      onMouseLeave={() => setHoveredEvent(null)}
    >
      <div className="text-white truncate">{event.name}</div>
      <div className="text-sm text-gray-300 truncate">{`${startTime} - ${endTime}`}</div>
      <p className="text-xs text-gray-300 text-right">...</p>
    </div>
  );
};
