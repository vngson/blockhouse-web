import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ServiceFormDialog from './ServiceFormDialog';
import { Service } from '../../types/service.types';

const mockService: Service = { id: 1, name: 'Cắt tóc', description: 'Cắt tóc nam', price: 50000 };

describe('ServiceFormDialog', () => {
  it('shows add mode title', () => {
    render(<ServiceFormDialog open={true} mode="add" onClose={() => {}} onSubmit={() => {}} />);
    expect(screen.getByText('Thêm dịch vụ mới')).toBeInTheDocument();
  });

  it('shows edit mode title', () => {
    render(<ServiceFormDialog open={true} mode="edit" service={mockService} onClose={() => {}} onSubmit={() => {}} />);
    expect(screen.getByText('Cập nhật dịch vụ')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<ServiceFormDialog open={false} mode="add" onClose={() => {}} onSubmit={() => {}} />);
    expect(screen.queryByText('Thêm dịch vụ mới')).not.toBeInTheDocument();
  });

  it('calls onClose when cancel clicked', async () => {
    const handleClose = jest.fn();
    render(<ServiceFormDialog open={true} mode="add" onClose={handleClose} onSubmit={() => {}} />);
    await userEvent.click(screen.getByText('Huỷ'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('has submit button', () => {
    render(<ServiceFormDialog open={true} mode="add" onClose={() => {}} onSubmit={() => {}} />);
    expect(screen.getByText('Thêm dịch vụ')).toBeInTheDocument();
  });
});
