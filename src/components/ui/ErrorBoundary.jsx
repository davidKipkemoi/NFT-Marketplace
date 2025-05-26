import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by error boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-4 text-slate-300">
              We're sorry, but an error occurred while rendering this page.
            </p>
            <div className="bg-slate-800 rounded-lg p-4 mb-4 text-left overflow-auto max-h-64">
              <details className="text-sm text-slate-400">
                <summary className="cursor-pointer mb-2 text-slate-300 font-medium">View error details</summary>
                <p className="mb-2 text-red-400">{this.state.error && this.state.error.toString()}</p>
                <pre className="text-xs text-slate-400 max-w-full overflow-x-auto">
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md font-medium"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary; 