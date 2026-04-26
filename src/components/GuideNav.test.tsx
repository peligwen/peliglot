import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GuideNav } from './GuideNav';
import type { Theme } from '../styles/themes';

const theme = {
  headerBg: '#fff', borderColor: '#e0dcd5', textPrimary: '#1a1a1a',
  textSecondary: '#6E6E6E', textMuted: '#555', shellFont: 'system-ui',
  buttonBg: '#fff', buttonText: '#555', buttonDisabledBg: '#f5f5f5', buttonDisabledText: '#ccc',
} as Theme;

const meta = { id: 1, cat: 'Basics', icon: '🌍', subtitle: 'Intro', title: 'Guide One', color: '#1B5E20' };

function renderNav(props = {}) {
  const defaults = {
    page: 0, total: 5, meta, menuOpen: false,
    hamburgerRef: { current: null },
    onToggleMenu: vi.fn(), onPrev: vi.fn(), onNext: vi.fn(), onOpenSearch: vi.fn(),
    theme,
  };
  return render(<GuideNav {...defaults} {...props} />);
}

describe('GuideNav', () => {
  it('renders the hamburger button with correct aria-label when closed', () => {
    renderNav({ menuOpen: false });
    expect(screen.getByRole('button', { name: 'Open guide menu' })).toBeInTheDocument();
  });

  it('renders the hamburger button with correct aria-label when open', () => {
    renderNav({ menuOpen: true });
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
  });

  it('renders the guide counter with correct aria-label', () => {
    renderNav({ page: 1, total: 10 });
    expect(screen.getByLabelText('Guide 2 of 10 guides')).toBeInTheDocument();
  });

  it('disables the Prev button on the first guide', () => {
    renderNav({ page: 0 });
    expect(screen.getByRole('button', { name: 'Previous guide' })).toBeDisabled();
  });

  it('disables the Next button on the last guide', () => {
    renderNav({ page: 4, total: 5 });
    expect(screen.getByRole('button', { name: 'Next guide' })).toBeDisabled();
  });

  it('calls onToggleMenu when hamburger is clicked', async () => {
    const onToggleMenu = vi.fn();
    renderNav({ onToggleMenu });
    await userEvent.click(screen.getByRole('button', { name: 'Open guide menu' }));
    expect(onToggleMenu).toHaveBeenCalledOnce();
  });

  it('calls onPrev when Prev is clicked', async () => {
    const onPrev = vi.fn();
    renderNav({ page: 2, onPrev });
    await userEvent.click(screen.getByRole('button', { name: 'Previous guide' }));
    expect(onPrev).toHaveBeenCalledOnce();
  });

  it('calls onNext when Next is clicked', async () => {
    const onNext = vi.fn();
    renderNav({ page: 0, total: 5, onNext });
    await userEvent.click(screen.getByRole('button', { name: 'Next guide' }));
    expect(onNext).toHaveBeenCalledOnce();
  });

  it('calls onOpenSearch when search button is clicked', async () => {
    const onOpenSearch = vi.fn();
    renderNav({ onOpenSearch });
    await userEvent.click(screen.getByRole('button', { name: 'Search guides' }));
    expect(onOpenSearch).toHaveBeenCalledOnce();
  });

  it('renders the guide subtitle and title from meta', () => {
    renderNav();
    expect(screen.getByText(/Intro/)).toBeInTheDocument();
    expect(screen.getByText('Guide One')).toBeInTheDocument();
  });
});
