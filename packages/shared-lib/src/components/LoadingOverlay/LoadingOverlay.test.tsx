import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoadingOverlay from './LoadingOverlay';

describe('LoadingOverlay', () => {
  it('renders when loading=true (default)', () => {
    render(<LoadingOverlay />);
    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
  });

  it('does not render when loading=false', () => {
    render(<LoadingOverlay loading={false} />);
    expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument();
  });
});
