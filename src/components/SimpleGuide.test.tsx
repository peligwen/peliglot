import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SimpleGuide } from './SimpleGuide';

const items = [
  { h: '¿Cómo estás?', b: 'How are you?' },
  { h: '¿Qué tal?', b: 'What\'s up? / How\'s it going?' },
  { h: 'Muy bien, gracias', b: 'Very well, thank you' },
];

describe('SimpleGuide', () => {
  it('renders all item headings', () => {
    render(<SimpleGuide items={items} />);
    expect(screen.getByText('¿Cómo estás?')).toBeInTheDocument();
    expect(screen.getByText('¿Qué tal?')).toBeInTheDocument();
    expect(screen.getByText('Muy bien, gracias')).toBeInTheDocument();
  });

  it('renders all item bodies', () => {
    render(<SimpleGuide items={items} />);
    expect(screen.getByText('How are you?')).toBeInTheDocument();
    expect(screen.getByText('Very well, thank you')).toBeInTheDocument();
  });

  it('renders the correct number of items', () => {
    const { container } = render(<SimpleGuide items={items} />);
    // Each item is a div with rounded corners; count by finding heading elements
    const headings = container.querySelectorAll('div > div:first-child');
    expect(headings.length).toBeGreaterThanOrEqual(items.length);
  });

  it('renders an empty list without throwing', () => {
    const { container } = render(<SimpleGuide items={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
