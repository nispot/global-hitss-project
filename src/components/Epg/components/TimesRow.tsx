import { useTimeTitles } from '@/hooks/useTimeTitles';
import { TimeCard } from '@epgComponents/TimeCard';

export const TimesRow = () => {
  const timeTitles = useTimeTitles();
  return (
    <div className="sticky top-0 z-10 bg-[#000000]">
      <div
        className="flex"
        style={{
          width: `${150 + timeTitles.length * 150}px`,
        }}
      >
        <div
          className="sticky left-0 bg-[#1A1A1A] text-white text-center font-bold p-2 border-r-4 border-[#000000] z-20"
          style={{ width: '150px' }}
        >
          Hoy
        </div>

        {timeTitles.map((timeSlot, index) => (
          <TimeCard key={index} timeSlot={timeSlot} />
        ))}
      </div>
    </div>
  );
};
