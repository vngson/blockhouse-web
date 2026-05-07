import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ServiceTable from './ServiceTable';
import { Service } from '../../types/service.types';

const services: Service[] = [
  { id: 1, name: 'Cắt tóc nam', description: 'Cắt tóc nam cơ bản', price: 50000 },
  { id: 2, name: 'Uốn tóc', description: 'Uốn tóc时尚', price: 200000 },
];

describe('ServiceTable', () => {
  it('renders service names', () => {
    render(
      <ServiceTable services={services} page={1} totalServices={2} pageSize={10} onPageChange={() => {}} onEdit={() => {}} />,
    );
    expect(screen.getByText('Cắt tóc nam')).toBeInTheDocument();
    expect(screen.getByText('Uốn tóc')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(
      <ServiceTable services={services} page={1} totalServices={2} pageSize={10} onPageChange={() => {}} onEdit={() => {}} />,
    );
    expect(screen.getByText('Dịch vụ')).toBeInTheDocument();
    expect(screen.getByText('Giá')).toBeInTheDocument();
  });

  it('shows skeleton when loading with no data', () => {
    const { container } = render(
      <ServiceTable services={[]} page={1} totalServices={0} pageSize={10} onPageChange={() => {}} onEdit={() => {}} loading />,
    );
    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThan(0);
  });

  it('shows empty message when no services', () => {
    render(
      <ServiceTable services={[]} page={1} totalServices={0} pageSize={10} onPageChange={() => {}} onEdit={() => {}} />,
    );
    expect(screen.getByText('Không có dịch vụ nào')).toBeInTheDocument();
  });

  it('shows keyword in empty message', () => {
    render(
      <ServiceTable services={[]} page={1} totalServices={0} pageSize={10} onPageChange={() => {}} onEdit={() => {}} keyword="abc" />,
    );
    expect(screen.getByText(/Không tìm thấy dịch vụ nào cho "abc"/)).toBeInTheDocument();
  });

  it('calls onEdit when row clicked', async () => {
    const handleEdit = jest.fn();
    render(
      <ServiceTable services={services} page={1} totalServices={2} pageSize={10} onPageChange={() => {}} onEdit={handleEdit} />,
    );
    await userEvent.click(screen.getByText('Cắt tóc nam'));
    expect(handleEdit).toHaveBeenCalled();
  });
});
