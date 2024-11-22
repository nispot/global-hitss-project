import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  calculateProportionalPosition,
  formatDuration,
  formatTime,
  generateTimeTitles,
  getApiDateRange,
} from './datesAndTimes';

describe('datesAndTimes utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getApiDateRange', () => {
    it('returns correct date range', () => {
      vi.setSystemTime(new Date('2023-05-01T12:00:00'));
      const range = getApiDateRange();
      expect(range.startDate).toMatch(/^20230501\d{6}$/);
      expect(range.endDate).toMatch(/^20230502\d{6}$/);
    });
  });

  describe('formatDuration', () => {
    it('formats duration correctly', () => {
      expect(formatDuration('2:30')).toBe('2h 30min');
      expect(formatDuration('1:05')).toBe('1h 5min');
      expect(formatDuration('0:45')).toBe('0h 45min');
    });
  });

  describe('generateTimeTitles', () => {
    it('generates correct number of time titles', () => {
      vi.setSystemTime(new Date('2023-05-01T12:00:00'));
      const titles = generateTimeTitles();
      expect(titles.length).toBe(54);
      expect(titles[0].label).toMatch(/^\d{2}:00$/);
      expect(titles[53].label).toMatch(/^\d{2}:30$/);
    });
  });

  describe('formatTime', () => {
    it('formats unix time correctly', () => {
      const date = new Date(1620000000 * 1000);
      const expectedHour = date.getHours().toString().padStart(2, '0');
      const expectedMinute = date.getMinutes().toString().padStart(2, '0');
      expect(formatTime(1620000000)).toBe(`${expectedHour}:${expectedMinute}`);
    });
  });

  describe('calculateProportionalPosition', () => {
    it('calculates position correctly', () => {
      const timeSlots = [
        { label: '12:00', timestamp: 1620000000 },
        { label: '12:30', timestamp: 1620001800 },
        { label: '13:00', timestamp: 1620003600 },
      ];
      const result = calculateProportionalPosition(
        1620000900,
        1620002700,
        timeSlots
      );
      expect(result.startPosition).toBeCloseTo(75, 0);
      expect(result.width).toBeCloseTo(150, 0);
    });

    it('handles edge cases', () => {
      const timeSlots = [
        { label: '12:00', timestamp: 1620000000 },
        { label: '12:30', timestamp: 1620001800 },
        { label: '13:00', timestamp: 1620003600 },
      ];
      const result = calculateProportionalPosition(
        1619999000,
        1620005400,
        timeSlots
      );
      expect(result.startPosition).toBe(0);
      expect(result.width).toBeCloseTo(533, 0);
    });
  });
});
