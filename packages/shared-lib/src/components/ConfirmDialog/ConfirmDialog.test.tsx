import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmDialog from './ConfirmDialog';

describe('ConfirmDialog', () => {
  it('renders title and message when open', () => {
    render(
      <ConfirmDialog
        open={true}
        title="Xoá?"
        message="Bạn có chắc không?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByText('Xoá?')).toBeInTheDocument();
    expect(screen.getByText('Bạn có chắc không?')).toBeInTheDocument();
  });

  it('does not render content when closed', () => {
    render(
      <ConfirmDialog
        open={false}
        title="Xoá?"
        message="Bạn có chắc không?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.queryByText('Xoá?')).not.toBeInTheDocument();
  });

  it('calls onCancel when cancel button clicked', async () => {
    const handleCancel = jest.fn();
    render(
      <ConfirmDialog
        open={true}
        title="Test"
        message="Msg"
        onConfirm={() => {}}
        onCancel={handleCancel}
      />,
    );
    await userEvent.click(screen.getByText('Huỷ'));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when confirm button clicked', async () => {
    const handleConfirm = jest.fn();
    render(
      <ConfirmDialog
        open={true}
        title="Test"
        message="Msg"
        onConfirm={handleConfirm}
        onCancel={() => {}}
      />,
    );
    await userEvent.click(screen.getByText('Xác nhận'));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('uses custom button labels', () => {
    render(
      <ConfirmDialog
        open={true}
        title="Test"
        message="Msg"
        confirmLabel="Delete"
        cancelLabel="Go back"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Go back')).toBeInTheDocument();
  });
});
