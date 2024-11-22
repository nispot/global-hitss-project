import { useTimeTitles } from '@/hooks/useTimeTitles';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TimesRow } from './TimesRow';

vi.mock('@/hooks/useTimeTitles');
vi.mock('@epgComponents/TimeCard', () => ({
  TimeCard: ({
    timeSlot,
  }: {
    timeSlot: { timestamp: string; label: string };
  }) => (
    <div data-testid={`time-card-${timeSlot.timestamp}`}>{timeSlot.label}</div>
  ),
}));

describe('TimesRow', () => {
  const mockTimeTitles = [
    { label: '00:00', timestamp: 1625097600 },
    { label: '01:00', timestamp: 1625101200 },
    { label: '02:00', timestamp: 1625104800 },
  ];

  beforeEach(() => {
    vi.mocked(useTimeTitles).mockReturnValue(mockTimeTitles);
  });

  it('renders "Hoy" text', () => {
    render(<TimesRow />);
    expect(screen.getByText('Hoy')).toBeDefined();
  });

  it('renders TimeCard components for each time slot', () => {
    render(<TimesRow />);
    mockTimeTitles.forEach((timeSlot) => {
      expect(
        screen.getByTestId(`time-card-${timeSlot.timestamp}`)
      ).toBeDefined();
    });
  });

  it('applies correct styles to the container', () => {
    render(<TimesRow />);
    const container = screen.getByText('Hoy').closest('div')
      ?.parentElement?.parentElement;
    expect(container).toBeDefined();
    expect(container?.className).toContain('sticky top-0 z-10 bg-[#000000]');
  });

  it('applies correct styles to the inner container', () => {
    render(<TimesRow />);
    const innerContainer = screen
      .getByText('Hoy')
      .closest('div')?.parentElement;
    expect(innerContainer).toBeDefined();
    expect(innerContainer?.className).toContain('flex');
    expect(innerContainer?.style.width).toBe('600px'); // 150 + 3 * 150 = 600
  });

  it('applies correct styles to the "Hoy" container', () => {
    render(<TimesRow />);
    const hoyContainer = screen.getByText('Hoy');
    expect(hoyContainer).toBeDefined();
    expect(hoyContainer.className).toContain(
      'sticky left-0 bg-[#1A1A1A] text-white text-center font-bold p-2 border-r-4 border-[#000000] z-20'
    );
    expect(hoyContainer.style.width).toBe('150px');
  });
});
