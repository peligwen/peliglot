import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Insight } from './Insight';

describe('Insight', () => {
  it('renders the tip text', () => {
    render(<Insight text="Remember: adjective agrees in gender." />);
    expect(screen.getByText(/Remember: adjective agrees in gender\./)).toBeInTheDocument();
  });

  it('renders the default 💡 emoji when none is provided', () => {
    render(<Insight text="A tip" />);
    expect(screen.getByText(/💡/)).toBeInTheDocument();
  });

  it('renders a custom emoji when provided', () => {
    render(<Insight text="A tip" emoji="🌟" />);
    expect(screen.getByText(/🌟/)).toBeInTheDocument();
  });
});
