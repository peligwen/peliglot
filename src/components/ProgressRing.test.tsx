import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ProgressRing } from './ProgressRing';

describe('ProgressRing', () => {
  it('renders an SVG element without throwing', () => {
    const { container } = render(<ProgressRing progress={0.5} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders two circles (track + fill)', () => {
    const { container } = render(<ProgressRing progress={0.5} />);
    expect(container.querySelectorAll('circle')).toHaveLength(2);
  });

  it('handles progress=0 without throwing', () => {
    const { container } = render(<ProgressRing progress={0} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('handles progress=1 without throwing', () => {
    const { container } = render(<ProgressRing progress={1} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('clamps values outside 0–1 without throwing', () => {
    const { container: c1 } = render(<ProgressRing progress={-0.5} />);
    expect(c1.querySelector('svg')).toBeInTheDocument();
    const { container: c2 } = render(<ProgressRing progress={1.5} />);
    expect(c2.querySelector('svg')).toBeInTheDocument();
  });

  it('respects custom size prop', () => {
    const { container } = render(<ProgressRing progress={0.75} size={48} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });
});
