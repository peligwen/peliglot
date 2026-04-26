import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExpandSection } from './ExpandSection';

describe('ExpandSection', () => {
  it('renders collapsed by default — children not visible', () => {
    render(
      <ExpandSection title="Show More" color="#1B5E20">
        <div>Hidden content</div>
      </ExpandSection>
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('shows the toggle button with the title', () => {
    render(
      <ExpandSection title="Show More" color="#1B5E20">
        <div>Hidden content</div>
      </ExpandSection>
    );
    expect(screen.getByRole('button', { name: /Show More/i })).toBeInTheDocument();
  });

  it('reveals children after clicking the toggle button', async () => {
    const user = userEvent.setup();
    render(
      <ExpandSection title="Advanced Notes" color="#1B5E20">
        <div>Revealed content</div>
      </ExpandSection>
    );
    const btn = screen.getByRole('button', { name: /Advanced Notes/i });
    await user.click(btn);
    expect(screen.getByText('Revealed content')).toBeInTheDocument();
  });

  it('hides children again after a second click', async () => {
    const user = userEvent.setup();
    render(
      <ExpandSection title="Toggle" color="#1B5E20">
        <div>Toggled content</div>
      </ExpandSection>
    );
    const btn = screen.getByRole('button', { name: /Toggle/i });
    await user.click(btn);
    expect(screen.getByText('Toggled content')).toBeInTheDocument();
    await user.click(btn);
    expect(screen.queryByText('Toggled content')).not.toBeInTheDocument();
  });
});
