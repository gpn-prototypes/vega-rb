import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  hasError: boolean;
}

export class ErrorBoundary<T> extends React.Component<T, ErrorBoundaryProps> {
  constructor(props: T) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error(errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <h1>
          Что-то пошло не так. Попробуйте перезагрузить страницу, приносим свои
          извинения.
        </h1>
      );
    }

    return this.props.children;
  }
}
