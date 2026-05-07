import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TopEmployeeList from './TopEmployeeList';
import { EmployeeRevenue } from '../../types/dashboard.types';

const employees: EmployeeRevenue[] = [
  { id: 1, name: 'Nguyễn Văn A', revenue: 35000000, order_count: 85 },
  { id: 2, name: 'Trần Thị B', revenue: 28000000, order_count: 72 },
];

describe('TopEmployeeList', () => {
  it('renders employee names', () => {
    render(<TopEmployeeList employees={employees} />);
    expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument();
    expect(screen.getByText('Trần Thị B')).toBeInTheDocument();
  });

  it('renders section title', () => {
    render(<TopEmployeeList employees={employees} />);
    expect(screen.getByText('Top nhân viên')).toBeInTheDocument();
  });

  it('renders with empty employees array', () => {
    render(<TopEmployeeList employees={[]} />);
    expect(screen.getByText('Top nhân viên')).toBeInTheDocument();
  });
});
