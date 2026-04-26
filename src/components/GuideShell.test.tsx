import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { GuideShell } from './GuideShell';
import { lightTheme } from '../styles/themes';

// Minimal mock guide components
function Guide1() { return <div>Guide One Content</div>; }
function Guide2() { return <div>Guide Two Content</div>; }
function Guide3() { return <div>Guide Three Content</div>; }

const guidesMeta = [
  { id: 1, title: 'Alphabet', subtitle: 'Letters', cat: 'Basics', color: '#1B5E20', icon: '🔤' },
  { id: 2, title: 'Numbers', subtitle: 'Counting', cat: 'Basics', color: '#0D47A1', icon: '🔢' },
  { id: 3, title: 'Greetings', subtitle: 'Hellos', cat: 'Phrases', color: '#E65100', icon: '👋' },
];
const guideComponents = [Guide1, Guide2, Guide3];
const categories = ['Basics', 'Phrases'];
const catColors = { Basics: '#1B5E20', Phrases: '#E65100' };

function renderShell(props = {}) {
  const defaults = {
    slug: 'spanish' as const,
    guidesMeta,
    guideComponents,
    categories,
    catColors,
    theme: lightTheme,
    storageKey: 'peliglot-test-' + Math.random(),
    sidebarTitle: 'Test Collection',
    sidebarSubtitle: '3 Interactive Guides',
  };
  return render(
    <MemoryRouter>
      <GuideShell {...defaults} {...props} />
    </MemoryRouter>
  );
}

describe('GuideShell', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.style.overflow = '';
    // Reset URL hash so useGuideNavigation always starts at page 0
    window.history.replaceState(null, '', '/');
  });

  it('renders the first guide by default', () => {
    renderShell();
    expect(screen.getByText('Guide One Content')).toBeInTheDocument();
  });

  it('renders the top bar with correct guide counter', () => {
    renderShell();
    expect(screen.getByLabelText('Guide 1 of 3 guides')).toBeInTheDocument();
  });

  it('renders the hamburger button', () => {
    renderShell();
    expect(screen.getByRole('button', { name: 'Open guide menu' })).toBeInTheDocument();
  });

  it('renders the sidebar dialog (initially off-screen)', () => {
    renderShell();
    expect(screen.getByRole('dialog', { name: 'Guide list' })).toBeInTheDocument();
  });

  it('opens the sidebar when hamburger is clicked', async () => {
    renderShell();
    await userEvent.click(screen.getByRole('button', { name: 'Open guide menu' }));
    const dialog = screen.getByRole('dialog', { name: 'Guide list' });
    expect(dialog.style.transform).toBe('translateX(0)');
  });

  it('shows sidebarTitle inside the sidebar', async () => {
    renderShell();
    await userEvent.click(screen.getByRole('button', { name: 'Open guide menu' }));
    const dialog = screen.getByRole('dialog', { name: 'Guide list' });
    expect(dialog).toHaveTextContent('Test Collection');
  });

  it('navigates to the second guide when its sidebar button is clicked', async () => {
    renderShell();
    await userEvent.click(screen.getByRole('button', { name: 'Open guide menu' }));
    const dialog = screen.getByRole('dialog', { name: 'Guide list' });
    // First button is first guide (index 0), second button is second guide
    await userEvent.click(dialog.querySelectorAll('button')[1]);
    expect(screen.getByText('Guide Two Content')).toBeInTheDocument();
    expect(screen.getByLabelText('Guide 2 of 3 guides')).toBeInTheDocument();
  });

  it('navigates forward with the Next button', async () => {
    renderShell();
    await userEvent.click(screen.getByRole('button', { name: 'Next guide' }));
    expect(screen.getByText('Guide Two Content')).toBeInTheDocument();
  });

  it('navigates back with the Prev button', async () => {
    renderShell();
    // Go to guide 2 first
    await userEvent.click(screen.getByRole('button', { name: 'Next guide' }));
    expect(screen.getByText('Guide Two Content')).toBeInTheDocument();
    // Now go back
    await userEvent.click(screen.getByRole('button', { name: 'Previous guide' }));
    expect(screen.getByText('Guide One Content')).toBeInTheDocument();
  });

  it('disables Prev on first guide and Next on last guide', async () => {
    renderShell();
    expect(screen.getByRole('button', { name: 'Previous guide' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next guide' })).not.toBeDisabled();

    // Navigate to last guide
    await userEvent.click(screen.getByRole('button', { name: 'Next guide' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next guide' }));
    expect(screen.getByRole('button', { name: 'Next guide' })).toBeDisabled();
  });

  it('renders main content area with id="main-content"', () => {
    renderShell();
    expect(document.getElementById('main-content')).toBeInTheDocument();
  });

  it('renders the skip link', () => {
    renderShell();
    expect(screen.getByText('Skip to content')).toBeInTheDocument();
  });

  it('opens sidebar in search mode when Search button is clicked', async () => {
    renderShell();
    await userEvent.click(screen.getByRole('button', { name: 'Search guides' }));
    const dialog = screen.getByRole('dialog', { name: 'Guide list' });
    expect(dialog.style.transform).toBe('translateX(0)');
  });
});
