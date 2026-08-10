import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * ErrorBoundary — catches render errors in its subtree and displays a fallback
 * instead of unmounting the whole app.
 *
 * Usage: wrap each lazy route with it:
 *   <ErrorBoundary><Suspense>...</Suspense></ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-bee-bg-primary px-6 text-center text-white">
          <h1 className="text-display-xl font-bold text-bee-accent">Oops</h1>
          <p className="mt-4 text-copy-lg text-white/70">
            Something went wrong. Please refresh or go back.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 rounded-pill bg-bee-accent px-8 py-3 text-base font-semibold text-black transition hover:brightness-110"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}