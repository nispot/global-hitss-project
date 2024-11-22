import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import EPGModal from './EPGModal';

vi.mock('@components/Epg/Epg', () => ({
  default: () => <div data-testid="epg-component">Mocked Epg Component</div>,
}));

describe('EPGModal', () => {
  it('renders correctly', () => {
    const mockOnClose = vi.fn();
    render(<EPGModal onClose={mockOnClose} />);

    expect(screen.getByText('X')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = vi.fn();
    render(<EPGModal onClose={mockOnClose} />);

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders Epg component', () => {
    const mockOnClose = vi.fn();
    render(<EPGModal onClose={mockOnClose} />);

    expect(screen.getByTestId('epg-component')).toBeDefined();
    expect(screen.getByText('Mocked Epg Component')).toBeDefined();
  });
});
