import { TimeTitle } from '@/types';
import { createContext, useContext } from 'react';

export const TimeTitlesContext = createContext<TimeTitle[] | undefined>(
  undefined
);

export const useTimeTitles = (): TimeTitle[] => {
  const context = useContext(TimeTitlesContext);
  if (!context) {
    throw new Error('useTimeTitles must be used within a TimeTitlesProvider');
  }
  return context;
};
