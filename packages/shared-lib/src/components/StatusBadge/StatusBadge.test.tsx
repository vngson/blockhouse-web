import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';

describe('StatusBadge', () => {
  it('shows "Hoạt động" when status=1', () => {
    render(<StatusBadge status={1} />);
    expect(screen.getByText('Hoạt động')).toBeInTheDocument();
  });

  it('shows "Ngưng" when status=0', () => {
    render(<StatusBadge status={0} />);
    expect(screen.getByText('Ngưng')).toBeInTheDocument();
  });

  it('shows "Không rõ" for unknown status', () => {
    render(<StatusBadge status={99} />);
    expect(screen.getByText('Không rõ')).toBeInTheDocument();
  });
});
