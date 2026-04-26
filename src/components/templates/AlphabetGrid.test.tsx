import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlphabetGrid } from './AlphabetGrid';

// Realistic letter shape matching Hawaiian/Spanish guide data.
// We use nameKey="type" so the aria-label becomes "A, vowel" (unique vs "All" button).
type Letter = { l: string; sound: string; type: string; note: string };

const letters: Letter[] = [
  { l: 'A', sound: '/a/ — ah as in father', type: 'vowel', note: 'Open front vowel' },
  { l: 'E', sound: '/e/ — eh as in bet', type: 'vowel', note: 'Mid front vowel' },
  { l: 'K', sound: '/k/ — softer than English k', type: 'consonant', note: 'No aspiration' },
  { l: 'L', sound: '/l/ — as in English let', type: 'consonant', note: 'Lighter than English' },
];

const filterGroups = [
  { id: 'all', label: 'All', filterFn: (_l: Letter) => true },
  { id: 'vowel', label: 'Vowels', filterFn: (l: Letter) => l.type === 'vowel' },
  { id: 'consonant', label: 'Consonants', filterFn: (l: Letter) => l.type === 'consonant' },
];

const detailFields: Array<{ key: keyof Letter; label?: string; bgColor?: string; borderColor?: string; textColor?: string }> = [
  { key: 'sound' },
  { key: 'note', label: 'Note', bgColor: '#F5F9F5', borderColor: '#D4E8D4', textColor: '#2E7D32' },
];

// Helper: find a letter button by its aria-label (e.g. "A, vowel")
function getLetterBtn(letter: string) {
  return screen.getByRole('button', { name: new RegExp(`^${letter},`) });
}

describe('AlphabetGrid', () => {
  it('renders all letter buttons', () => {
    render(
      <AlphabetGrid
        letters={letters}
        letterKey="l"
        nameKey="type"
        filterGroups={filterGroups}
        detailFields={detailFields}
        primaryColor="#1B5E20"
      />
    );
    expect(getLetterBtn('A')).toBeInTheDocument();
    expect(getLetterBtn('E')).toBeInTheDocument();
    expect(getLetterBtn('K')).toBeInTheDocument();
    expect(getLetterBtn('L')).toBeInTheDocument();
  });

  it('renders filter buttons', () => {
    render(
      <AlphabetGrid
        letters={letters}
        letterKey="l"
        nameKey="type"
        filterGroups={filterGroups}
        detailFields={detailFields}
        primaryColor="#1B5E20"
      />
    );
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Vowels' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Consonants' })).toBeInTheDocument();
  });

  it('calls speakFn with the letter value when a letter is clicked', async () => {
    const user = userEvent.setup();
    const speakFn = vi.fn();
    render(
      <AlphabetGrid
        letters={letters}
        letterKey="l"
        nameKey="type"
        filterGroups={filterGroups}
        detailFields={detailFields}
        primaryColor="#1B5E20"
        speakFn={speakFn}
      />
    );
    await user.click(getLetterBtn('A'));
    expect(speakFn).toHaveBeenCalledOnce();
    expect(speakFn).toHaveBeenCalledWith('A');
  });

  it('does not call speakFn when the same letter is clicked a second time (deselect)', async () => {
    const user = userEvent.setup();
    const speakFn = vi.fn();
    render(
      <AlphabetGrid
        letters={letters}
        letterKey="l"
        nameKey="type"
        filterGroups={filterGroups}
        detailFields={detailFields}
        primaryColor="#1B5E20"
        speakFn={speakFn}
      />
    );
    await user.click(getLetterBtn('A')); // select → speaks
    await user.click(getLetterBtn('A')); // deselect → no speak
    expect(speakFn).toHaveBeenCalledOnce();
  });

  it('uses speakKey field when provided', async () => {
    const user = userEvent.setup();
    const speakFn = vi.fn();
    render(
      <AlphabetGrid
        letters={letters}
        letterKey="l"
        nameKey="type"
        speakKey="sound"
        filterGroups={filterGroups}
        detailFields={detailFields}
        primaryColor="#1B5E20"
        speakFn={speakFn}
      />
    );
    await user.click(getLetterBtn('A'));
    expect(speakFn).toHaveBeenCalledWith('/a/ — ah as in father');
  });

  it('renders the introTitle in a DarkBox when provided', () => {
    render(
      <AlphabetGrid
        letters={letters}
        letterKey="l"
        nameKey="type"
        filterGroups={filterGroups}
        detailFields={detailFields}
        primaryColor="#1B5E20"
        introTitle="Only 13 Letters"
        introContent={<div>Hawaiian alphabet intro</div>}
      />
    );
    expect(screen.getByText('Only 13 Letters')).toBeInTheDocument();
    expect(screen.getByText('Hawaiian alphabet intro')).toBeInTheDocument();
  });

  it('shows detail fields after clicking a letter', async () => {
    const user = userEvent.setup();
    render(
      <AlphabetGrid
        letters={letters}
        letterKey="l"
        nameKey="type"
        filterGroups={filterGroups}
        detailFields={detailFields}
        primaryColor="#1B5E20"
      />
    );
    await user.click(getLetterBtn('A'));
    expect(screen.getByText('Open front vowel')).toBeInTheDocument();
  });

  it('filters letters when a filter button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <AlphabetGrid
        letters={letters}
        letterKey="l"
        nameKey="type"
        filterGroups={filterGroups}
        detailFields={detailFields}
        primaryColor="#1B5E20"
      />
    );
    await user.click(screen.getByRole('button', { name: 'Vowels' }));
    // Vowels A and E should be present; K and L should not
    expect(screen.getByRole('button', { name: /^A,/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^E,/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^K,/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^L,/ })).not.toBeInTheDocument();
  });
});
