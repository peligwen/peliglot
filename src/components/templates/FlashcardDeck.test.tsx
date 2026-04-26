import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FlashcardDeck } from './FlashcardDeck';

// Single-item array makes the initial card deterministic (no shuffle ambiguity)
const singleItem = [{ front: 'hola', back: 'hello' }];

const multipleItems = [
  { front: 'hola', back: 'hello' },
  { front: 'gracias', back: 'thank you' },
  { front: 'adiós', back: 'goodbye' },
];

describe('FlashcardDeck', () => {
  it('renders the front face of the current card', () => {
    render(<FlashcardDeck items={singleItem} color="#1565C0" />);
    // front text appears both in the visible face and the hidden sizer
    expect(screen.getAllByText('hola').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the optional title when provided', () => {
    render(<FlashcardDeck items={singleItem} color="#1565C0" title="Vocabulary" />);
    expect(screen.getByText('Vocabulary')).toBeInTheDocument();
  });

  it('shows progress counter', () => {
    render(<FlashcardDeck items={singleItem} color="#1565C0" />);
    expect(screen.getByText('0/1')).toBeInTheDocument();
  });

  it('does not call speakFn before the card is flipped', () => {
    const speakFn = vi.fn();
    render(<FlashcardDeck items={singleItem} color="#1565C0" speakFn={speakFn} />);
    expect(speakFn).not.toHaveBeenCalled();
  });

  it('calls speakFn with front value after clicking to flip', async () => {
    const user = userEvent.setup();
    const speakFn = vi.fn();
    render(<FlashcardDeck items={singleItem} color="#1565C0" speakFn={speakFn} />);
    // The card container is a div with onClick; click "Tap to flip" text area
    await user.click(screen.getByText('Tap to flip'));
    expect(speakFn).toHaveBeenCalledOnce();
    expect(speakFn).toHaveBeenCalledWith('hola');
  });

  it('shows the Restart button when all cards are cleared', async () => {
    const user = userEvent.setup();
    render(<FlashcardDeck items={singleItem} color="#1565C0" />);
    // Flip the card
    await user.click(screen.getByText('Tap to flip'));
    // Click "Got it" to clear the only card
    await user.click(screen.getByRole('button', { name: /Got it/i }));
    expect(screen.getByRole('button', { name: 'Restart' })).toBeInTheDocument();
  });

  it('renders without throwing with multiple items', () => {
    render(<FlashcardDeck items={multipleItems} color="#1565C0" />);
    // At least one card front should be present
    const fronts = multipleItems.map(i => i.front);
    const found = fronts.some(f => screen.queryAllByText(f).length > 0);
    expect(found).toBe(true);
  });
});
