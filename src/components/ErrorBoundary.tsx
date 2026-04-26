import { Component } from 'react';
import type { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2>Something went wrong</h2>
          <p style={{ color: '#666', margin: '12px 0' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            style={{ padding: '8px 24px', borderRadius: 8, border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontSize: 14 }}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
