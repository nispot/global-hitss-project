import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('@components/EPGModal', () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="epg-modal">
      EPG Modal
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('App', () => {
  it('renders the "Mostrar EPG" button initially', () => {
    render(<App />);
    expect(screen.getByText('Mostrar EPG')).toBeDefined();
  });

  it('shows EPGModal when button is clicked', () => {
    render(<App />);
    const button = screen.getByText('Mostrar EPG');
    fireEvent.click(button);
    expect(screen.getByTestId('epg-modal')).toBeDefined();
  });

  it('hides EPGModal when onClose is called', () => {
    render(<App />);
    const button = screen.getByText('Mostrar EPG');
    fireEvent.click(button);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('epg-modal')).toBeNull();
    expect(screen.getByText('Mostrar EPG')).toBeDefined();
  });

  it('applies correct styles to the container', () => {
    render(<App />);
    const container = screen.getByText('Mostrar EPG').closest('div');
    expect(container).toBeDefined();
    expect(container?.className).toContain(
      'flex items-center justify-center h-screen bg-gray-100'
    );
  });

  it('applies correct styles to the button', () => {
    render(<App />);
    const button = screen.getByText('Mostrar EPG');
    expect(button.className).toContain(
      'px-4 py-2 bg-[#B52217] text-white rounded hover:bg-[#545454]'
    );
  });
});
