import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderTable from './OrderTable';
import { Order } from '../../types/revenue.types';

const orders: Order[] = [
  { id: 1, datetime: '2024-01-15T10:30:00', employee_id: 1, employee_name: 'Nguyễn A', promotion_id: null, total: 150000, services: [{ service_id: 1, quantity: 1, name: 'Cắt tóc' }] },
  { id: 2, datetime: '2024-01-16T14:00:00', employee_id: 2, employee_name: 'Trần B', promotion_id: null, total: 200000, services: [{ service_id: 2, quantity: 2, name: 'Uốn' }] },
];

describe('OrderTable', () => {
  it('renders employee names in orders', () => {
    render(
      <OrderTable orders={orders} page={1} totalOrders={2} pageSize={10} onPageChange={() => {}} onViewDetail={() => {}} onEdit={() => {}} onDelete={() => {}} />,
    );
    expect(screen.getByText('Nguyễn A')).toBeInTheDocument();
    expect(screen.getByText('Trần B')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(
      <OrderTable orders={orders} page={1} totalOrders={2} pageSize={10} onPageChange={() => {}} onViewDetail={() => {}} onEdit={() => {}} onDelete={() => {}} />,
    );
    expect(screen.getByText('Thời gian')).toBeInTheDocument();
    expect(screen.getByText('Tổng tiền')).toBeInTheDocument();
  });

  it('shows skeleton when loading with no data', () => {
    const { container } = render(
      <OrderTable orders={[]} page={1} totalOrders={0} pageSize={10} onPageChange={() => {}} onViewDetail={() => {}} onEdit={() => {}} onDelete={() => {}} loading />,
    );
    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThan(0);
  });

  it('shows empty message when no orders', () => {
    render(
      <OrderTable orders={[]} page={1} totalOrders={0} pageSize={10} onPageChange={() => {}} onViewDetail={() => {}} onEdit={() => {}} onDelete={() => {}} />,
    );
    expect(screen.getByText('Không có đơn hàng nào')).toBeInTheDocument();
  });

  it('shows keyword in empty message', () => {
    render(
      <OrderTable orders={[]} page={1} totalOrders={0} pageSize={10} onPageChange={() => {}} onViewDetail={() => {}} onEdit={() => {}} onDelete={() => {}} keyword="test" />,
    );
    expect(screen.getByText(/Không tìm thấy đơn hàng nào cho "test"/)).toBeInTheDocument();
  });

  it('calls onViewDetail when row clicked', async () => {
    const handleView = jest.fn();
    render(
      <OrderTable orders={orders} page={1} totalOrders={2} pageSize={10} onPageChange={() => {}} onViewDetail={handleView} onEdit={() => {}} onDelete={() => {}} />,
    );
    await userEvent.click(screen.getByText('Nguyễn A'));
    expect(handleView).toHaveBeenCalled();
  });
});
