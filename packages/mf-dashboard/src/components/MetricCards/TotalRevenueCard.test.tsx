import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TotalRevenueCard from './TotalRevenueCard';

describe('TotalRevenueCard', () => {
  it('renders formatted currency value', () => {
    render(<TotalRevenueCard value={1000000} />);
    expect(screen.getByText('Tổng doanh thu')).toBeInTheDocument();
  });

  it('displays value in card', () => {
    render(<TotalRevenueCard value={50000} />);
    const card = screen.getByText('Tổng doanh thu').closest('.MuiCard-root');
    expect(card).toBeInTheDocument();
  });
});
