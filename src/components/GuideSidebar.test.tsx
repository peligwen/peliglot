import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { GuideSidebar } from './GuideSidebar';
import type { Theme } from '../styles/themes';

const theme = {
  sidebarBg: '#fff', borderColor: '#e0dcd5', textPrimary: '#1a1a1a',
  textSecondary: '#6E6E6E', sidebarActiveItemBg: '#f0eeeb',
  sidebarItemText: '#333', sidebarItemActiveText: null, sidebarSubText: '#6E6E6E',
  buttonBg: '#fff', buttonDisabledText: '#ccc', shellFont: 'system-ui',
} as Theme;

const guidesMeta = [
  { id: 1, title: 'Alphabet', subtitle: 'Letters', cat: 'Basics', color: '#1B5E20', icon: '🔤' },
  { id: 2, title: 'Numbers', subtitle: 'Counting', cat: 'Basics', color: '#0D47A1', icon: '🔢' },
  { id: 3, title: 'Greetings', subtitle: 'Hellos', cat: 'Phrases', color: '#E65100', icon: '👋' },
];
const categories = ['Basics', 'Phrases'];
const catColors = { Basics: '#1B5E20', Phrases: '#E65100' };

function renderSidebar(props = {}) {
  const defaults = {
    open: true, onClose: vi.fn(), focusSearch: false,
    onFocusSearchConsumed: vi.fn(), returnFocusRef: { current: null },
    guidesMeta, categories, catColors,
    page: 0, visitedSet: new Set<number>(),
    goTo: vi.fn(), theme,
    sidebarTitle: 'Test Collection',
    sidebarSubtitle: '3 Interactive Guides',
  };
  return render(
    <MemoryRouter>
      <GuideSidebar {...defaults} {...props} />
    </MemoryRouter>
  );
}

describe('GuideSidebar', () => {
  beforeEach(() => {
    // Reset body overflow between tests
    document.body.style.overflow = '';
  });

  it('renders with role=dialog and aria-label="Guide list"', () => {
    renderSidebar();
    expect(screen.getByRole('dialog', { name: 'Guide list' })).toBeInTheDocument();
  });

  it('renders the sidebarTitle', () => {
    renderSidebar();
    expect(screen.getByText('Test Collection')).toBeInTheDocument();
  });

  it('renders the sidebarSubtitle', () => {
    renderSidebar();
    expect(screen.getByText('3 Interactive Guides')).toBeInTheDocument();
  });

  it('renders a button for each guide', () => {
    renderSidebar();
    // Each guide in guidesMeta should have a button (by subtitle text)
    expect(screen.getByRole('button', { name: /Letters/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Counting/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Hellos/ })).toBeInTheDocument();
  });

  it('calls goTo when a guide button is clicked', async () => {
    const goTo = vi.fn();
    renderSidebar({ goTo });
    // Click second guide button (index 1)
    await userEvent.click(screen.getByRole('button', { name: /Counting/ }));
    expect(goTo).toHaveBeenCalledWith(1);
  });

  it('renders category headings', () => {
    renderSidebar();
    expect(screen.getByText('Basics')).toBeInTheDocument();
    expect(screen.getByText('Phrases')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    renderSidebar();
    expect(screen.getByPlaceholderText('Search guides...')).toBeInTheDocument();
  });

  it('shows search results when search term is entered', async () => {
    renderSidebar();
    const input = screen.getByPlaceholderText('Search guides...');
    await userEvent.type(input, 'alpha');
    expect(screen.getByRole('button', { name: /Letters/ })).toBeInTheDocument();
  });

  it('shows "No guides found" when search matches nothing', async () => {
    renderSidebar();
    const input = screen.getByPlaceholderText('Search guides...');
    await userEvent.type(input, 'xyzabc123notexist');
    expect(screen.getByText('No guides found')).toBeInTheDocument();
  });

  it('shows Clear search button when search term is present', async () => {
    renderSidebar();
    const input = screen.getByPlaceholderText('Search guides...');
    await userEvent.type(input, 'hello');
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('clears search when Clear search is clicked', async () => {
    renderSidebar();
    const input = screen.getByPlaceholderText('Search guides...');
    await userEvent.type(input, 'hello');
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('marks the current page guide as aria-current="page"', () => {
    renderSidebar({ page: 1 });
    const activeBtn = screen.getByRole('button', { name: /Counting/ });
    expect(activeBtn).toHaveAttribute('aria-current', 'page');
  });

  it('calls onClose when Escape is pressed and no search term', async () => {
    const onClose = vi.fn();
    renderSidebar({ onClose });
    // Focus a focusable element inside the dialog, then press Escape
    const input = screen.getByPlaceholderText('Search guides...');
    input.focus();
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('is hidden (translated off-screen) when open is false', () => {
    renderSidebar({ open: false });
    const dialog = screen.getByRole('dialog', { name: 'Guide list' });
    expect(dialog.style.transform).toBe('translateX(-100%)');
  });

  it('is visible (no translate) when open is true', () => {
    renderSidebar({ open: true });
    const dialog = screen.getByRole('dialog', { name: 'Guide list' });
    expect(dialog.style.transform).toBe('translateX(0)');
  });

  it('renders an "All collections" home link pointing to "/"', () => {
    renderSidebar();
    const homeLink = screen.getByRole('link', { name: /all collections/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
