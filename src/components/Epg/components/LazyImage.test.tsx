import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LazyImage } from './LazyImage';

const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

describe('LazyImage', () => {
  const mockProps = {
    src: 'https://example.com/image.jpg',
    alt: 'Test image',
    className: 'test-class',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with correct props', () => {
    render(<LazyImage {...mockProps} />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeDefined();
    expect(img.className).toBe('test-class');
    expect(img.getAttribute('width')).toBe('100px');
    expect(img.getAttribute('loading')).toBe('lazy');
  });

  it('initially renders with empty src', () => {
    render(<LazyImage {...mockProps} />);
    const img = screen.getByAltText('Test image');
    expect(img.getAttribute('src')).toBe('');
  });

  it('updates src when intersection observer fires', async () => {
    render(<LazyImage {...mockProps} />);
    const img = screen.getByAltText('Test image');

    const [[callback]] = mockIntersectionObserver.mock.calls;
    await act(async () => {
      callback([{ isIntersecting: true }]);
    });

    expect(img.getAttribute('src')).toBe(mockProps.src);
  });

  it('creates and destroys intersection observer', () => {
    const { unmount } = render(<LazyImage {...mockProps} />);

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
    expect(mockIntersectionObserver.mock.calls[0][1]).toEqual({
      threshold: 0.1,
    });

    const observerInstance = mockIntersectionObserver.mock.results[0].value;
    expect(observerInstance.observe).toHaveBeenCalledTimes(1);

    unmount();

    expect(observerInstance.unobserve).toHaveBeenCalledTimes(1);
  });
});
