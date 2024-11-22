import { renderHook } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { TimeTitlesContext, useTimeTitles } from './useTimeTitles';

describe('useTimeTitles', () => {
  it('returns context value when used within provider', () => {
    const mockTimeTitles = [
      { label: '12:00', timestamp: 1625097600 },
      { label: '13:00', timestamp: 1625101200 },
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TimeTitlesContext.Provider value={mockTimeTitles}>
        {children}
      </TimeTitlesContext.Provider>
    );

    const { result } = renderHook(() => useTimeTitles(), { wrapper });

    expect(result.current).toEqual(mockTimeTitles);
  });

  it('throws error when used outside of provider', () => {
    expect(() => renderHook(() => useTimeTitles())).toThrow(
      'useTimeTitles must be used within a TimeTitlesProvider'
    );
  });
});
