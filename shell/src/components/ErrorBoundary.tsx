import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  fallbackRender?: (error: Error | null, info?: ErrorInfo | null) => ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
  onReset?: () => void;
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  info: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    info: null,
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // store additional info in state and call optional onError handler
    this.setState({ info });
    if (this.props.onError) {
      try {
        this.props.onError(error, info);
      } catch {
        // swallow errors from logging handlers
      }
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: null, info: null });
    if (this.props.onReset) {
      try {
        this.props.onReset();
      } catch {
        // ignore
      }
    }
  };

  renderFallback() {
    const { fallback, fallbackRender } = this.props;
    const { error, info } = this.state;

    if (fallbackRender) {
      return fallbackRender(error, info || undefined);
    }

    if (fallback) {
      return fallback;
    }

    // Default fallback UI
    return (
      <div
        style={{
          padding: 20,
          border: "1px solid #eee",
          borderRadius: 6,
          background: "#fff7f7",
          color: "#611a15",
        }}
      >
        <h2>Something went wrong</h2>
        {error && <pre style={{ whiteSpace: "pre-wrap" }}>{String(error)}</pre>}
        <div style={{ marginTop: 12 }}>
          <button onClick={this.reset} style={{ marginRight: 8 }}>
            Retry
          </button>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={this.props.className}>{this.renderFallback()}</div>
      );
    }

    return this.props.children as ReactNode;
  }
}
