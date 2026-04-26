import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders the title', () => {
    render(<Card color="#1B5E20" title="My Section">body</Card>);
    expect(screen.getByText('My Section')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Card color="#1B5E20" title="Section"><span>child content</span></Card>);
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('renders optional subtitle when provided', () => {
    render(<Card color="#1B5E20" title="Title" subtitle="Subtitle text">body</Card>);
    expect(screen.getByText('Subtitle text')).toBeInTheDocument();
  });

  it('does not render subtitle element when omitted', () => {
    render(<Card color="#1B5E20" title="Title">body</Card>);
    expect(screen.queryByText('Subtitle text')).not.toBeInTheDocument();
  });
});
