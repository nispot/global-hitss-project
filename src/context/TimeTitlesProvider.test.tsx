import { TimeTitlesContext } from '@hooks/useTimeTitles';
import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TimeTitlesProvider } from './TimeTitlesContext';

const TestComponent = () => {
  const timeTitles = useContext(TimeTitlesContext);
  return (
    <div>
      {timeTitles?.map((title, index) => (
        <span key={index} data-testid="time-title">
          {title.label}
        </span>
      ))}
    </div>
  );
};

describe('TimeTitlesProvider', () => {
  beforeEach(() => {
    // Mock the Date object to always return a specific date
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-01-01T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('provides the correct number of time titles', () => {
    render(
      <TimeTitlesProvider>
        <TestComponent />
      </TimeTitlesProvider>
    );
    const timeTitles = screen.getAllByTestId('time-title');
    expect(timeTitles.length).toBe(54); // 27 * 2
  });

  it('generates correct time labels', () => {
    render(
      <TimeTitlesProvider>
        <TestComponent />
      </TimeTitlesProvider>
    );
    const timeTitles = screen.getAllByTestId('time-title');
    expect(timeTitles[0]?.textContent).toBe('12:00');
    expect(timeTitles[1]?.textContent).toBe('12:30');
    expect(timeTitles[2]?.textContent).toBe('13:00');
    expect(timeTitles[53]?.textContent).toBe('14:30');
  });

  it('handles midnight correctly', () => {
    vi.setSystemTime(new Date('2023-01-01T23:45:00'));
    render(
      <TimeTitlesProvider>
        <TestComponent />
      </TimeTitlesProvider>
    );
    const timeTitles = screen.getAllByTestId('time-title');
    expect(timeTitles[0]?.textContent).toBe('23:00');
    expect(timeTitles[2]?.textContent).toBe('00:00');
    expect(timeTitles[3]?.textContent).toBe('00:30');
  });

  it('does not update time titles when date changes', () => {
    const { rerender } = render(
      <TimeTitlesProvider>
        <TestComponent />
      </TimeTitlesProvider>
    );
    expect(screen.getAllByTestId('time-title')[0]?.textContent).toBe('12:00');

    vi.setSystemTime(new Date('2023-01-01T14:00:00'));
    rerender(
      <TimeTitlesProvider>
        <TestComponent />
      </TimeTitlesProvider>
    );
    // The time should not change because of the useMemo dependency array
    expect(screen.getAllByTestId('time-title')[0]?.textContent).toBe('12:00');
  });
});
