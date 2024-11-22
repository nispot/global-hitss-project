import { TimeTitle } from '@/types';
import { TimeTitlesContext } from '@hooks/useTimeTitles';
import React, { useMemo } from 'react';

export const TimeTitlesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const timeTitles = useMemo(() => {
    const now = new Date();
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    let currentHour = now.getHours();

    if (currentHour < 0) {
      currentHour += 24;
    }

    const titles: TimeTitle[] = [];
    for (let i = 0; i < 27 * 2; i++) {
      const hour = (currentHour + Math.floor(i / 2)) % 24;
      const minutes = i % 2 === 0 ? '00' : '30';
      titles.push({
        label: `${hour.toString().padStart(2, '0')}:${minutes}`,
        timestamp:
          new Date(now.getTime() + i * 30 * 60 * 1000).getTime() / 1000,
      });
    }

    return titles;
  }, []);

  return (
    <TimeTitlesContext.Provider value={timeTitles}>
      {children}
    </TimeTitlesContext.Provider>
  );
};
