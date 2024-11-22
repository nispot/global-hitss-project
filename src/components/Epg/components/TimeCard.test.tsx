import { TimeTitle } from '@/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TimeCard } from './TimeCard';

describe('TimeCard', () => {
  const mockTimeSlot: TimeTitle = {
    label: '12:00',
    timestamp: 1625097600,
  };

  it('renders time label correctly', () => {
    render(<TimeCard timeSlot={mockTimeSlot} />);
    expect(screen.getByText('12:00hs.')).toBeDefined();
  });

  it('applies correct styles', () => {
    render(<TimeCard timeSlot={mockTimeSlot} />);
    const timeCardElement = screen.getByText('12:00hs.').closest('div');
    expect(timeCardElement).toBeDefined();
    expect(timeCardElement?.className).toContain(
      'text-center p-2 text-white whitespace-nowrap border-r border-gray-700 flex-shrink-0 bg-[#000000]'
    );
    expect(timeCardElement?.style.width).toBe('150px');
  });
});
