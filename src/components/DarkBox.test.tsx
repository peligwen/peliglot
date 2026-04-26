import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DarkBox } from './DarkBox';

describe('DarkBox', () => {
  it('renders the title', () => {
    render(<DarkBox title="Key Concept">explanation</DarkBox>);
    expect(screen.getByText('Key Concept')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<DarkBox title="Title"><p>Body text</p></DarkBox>);
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it('renders without title', () => {
    render(<DarkBox><p>Content only</p></DarkBox>);
    expect(screen.getByText('Content only')).toBeInTheDocument();
  });
});
