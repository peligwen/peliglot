import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

function ThrowingChild(): never {
  throw new Error('Test error from child');
}

function GoodChild() {
  return <div>Normal content</div>;
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children normally when there is no error', () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });

  it('renders fallback UI when a child throws', () => {
    // Suppress expected React error boundary console.error output
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error from child')).toBeInTheDocument();
  });

  it('renders the Try Again button in the fallback UI', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>
    );

    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
  });
});
