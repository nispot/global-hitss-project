import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChannelCard } from './ChannelCard';

vi.mock('@epgComponents/LazyImage', () => ({
  LazyImage: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className: string;
  }) => (
    <img src={src} alt={alt} className={className} data-testid="lazy-image" />
  ),
}));

describe('ChannelCard', () => {
  const mockChannel = {
    id: '001',
    name: 'Test Channel',
    events: [],
    number: '001',
    image: 'https://example.com/channel-logo.png',
  };

  it('renders channel number', () => {
    render(<ChannelCard channel={mockChannel} />);
    expect(screen.getByText('001')).toBeDefined();
  });

  it('renders LazyImage with correct props', () => {
    render(<ChannelCard channel={mockChannel} />);
    const lazyImage = screen.getByTestId('lazy-image');
    expect(lazyImage).toBeDefined();
    expect(lazyImage.getAttribute('src')).toBe(
      'https://example.com/channel-logo.png'
    );
    expect(lazyImage.getAttribute('alt')).toBe('Test Channel');
    expect(lazyImage.getAttribute('class')).toContain(
      'w-[100px] object-contain'
    );
  });

  it('applies correct styles to the container', () => {
    render(<ChannelCard channel={mockChannel} />);
    const container = screen.getByText('001').parentElement;
    expect(container).toBeDefined();
    expect(container?.className).toContain(
      'sticky left-0 bg-[#1A1A1A] text-white font-bold flex items-center justify-between p-2 border-4 border-r-8 border-[#000000] z-10'
    );
    expect(container?.style.width).toBe('150px');
  });
});
