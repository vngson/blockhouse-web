import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmployeeTable from './EmployeeTable';
import { Employee } from '../../types/employee.types';

const employees: Employee[] = [
  { id: 1, name: 'Nguyễn Văn A', phone: '0912345678', status: 1, income: 5000000, created_at: '2024-01-15', updated_at: '2024-01-15' },
  { id: 2, name: 'Trần Thị B', phone: '0987654321', status: 0, income: 0, created_at: '2024-02-01', updated_at: '2024-02-01' },
];

describe('EmployeeTable', () => {
  it('renders employee names', () => {
    render(
      <EmployeeTable employees={employees} page={1} totalEmployees={2} pageSize={10} onPageChange={() => {}} onViewDetail={() => {}} onToggleStatus={() => {}} />,
    );
    expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument();
    expect(screen.getByText('Trần Thị B')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(
      <EmployeeTable employees={employees} page={1} totalEmployees={2} pageSize={10} onPageChange={() => {}} onViewDetail={() => {}} onToggleStatus={() => {}} />,
    );
    expect(screen.getByText('Nhân viên')).toBeInTheDocument();
  });

  it('shows skeleton when loading with no data', () => {
    const { container } = render(
      <EmployeeTable employees={[]} page={1} totalEmployees={0} pageSize={10} onPageChange={() => {}} onViewDetail={() => {}} onToggleStatus={() => {}} loading />,
    );
    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThan(0);
  });

  it('shows empty message when no employees', () => {
    render(
      <EmployeeTable employees={[]} page={1} totalEmployees={0} pageSize={10} onPageChange={() => {}} onViewDetail={() => {}} onToggleStatus={() => {}} />,
    );
    expect(screen.getByText('Không có nhân viên nào')).toBeInTheDocument();
  });

  it('calls onViewDetail when row clicked', async () => {
    const handleView = jest.fn();
    render(
      <EmployeeTable employees={employees} page={1} totalEmployees={2} pageSize={10} onPageChange={() => {}} onViewDetail={handleView} onToggleStatus={() => {}} />,
    );
    await userEvent.click(screen.getByText('Nguyễn Văn A'));
    expect(handleView).toHaveBeenCalled();
  });
});
