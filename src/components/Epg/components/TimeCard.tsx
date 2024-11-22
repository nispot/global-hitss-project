import { TimeTitle } from '@/types';

interface TimeCardProps {
  timeSlot: TimeTitle;
}

export const TimeCard = ({ timeSlot }: TimeCardProps) => {
  return (
    <div
      className="text-center p-2 text-white whitespace-nowrap border-r border-gray-700 flex-shrink-0 bg-[#000000]"
      style={{
        width: '150px',
      }}
    >
      {timeSlot.label}hs.
    </div>
  );
};
