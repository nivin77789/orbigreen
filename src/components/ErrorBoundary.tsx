import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App render error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-section px-6 text-center text-primary">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-primary/45">Orbigreen</p>
          <h1 className="mt-4 text-balance text-[1.5rem] font-semibold tracking-tight">
            Something went wrong loading this page.
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-primary/65">
            Please refresh the page. If the issue continues, try clearing your browser cache.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="gradient-border-cta mt-8 rounded-full px-7 py-3 text-[14px] font-semibold"
          >
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
