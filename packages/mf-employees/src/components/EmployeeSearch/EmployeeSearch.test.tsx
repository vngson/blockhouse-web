import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmployeeSearch from './EmployeeSearch';

describe('EmployeeSearch', () => {
  const defaultProps = {
    keyword: '',
    onKeywordChange: jest.fn(),
    dateFrom: '',
    dateTo: '',
    onDateFromChange: jest.fn(),
    onDateToChange: jest.fn(),
    onClearAll: jest.fn(),
  };

  it('renders search input with placeholder', () => {
    render(<EmployeeSearch {...defaultProps} />);
    expect(screen.getByPlaceholderText('Tìm nhân viên theo tên, SĐT...')).toBeInTheDocument();
  });

  it('displays current keyword value', () => {
    render(<EmployeeSearch {...defaultProps} keyword="Nguyễn" />);
    expect(screen.getByDisplayValue('Nguyễn')).toBeInTheDocument();
  });

  it('calls onKeywordChange when typing', async () => {
    const handleChange = jest.fn();
    render(<EmployeeSearch {...defaultProps} onKeywordChange={handleChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'test');
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows clear all button when filters active', () => {
    render(<EmployeeSearch {...defaultProps} dateFrom="2024-01-01" />);
    expect(screen.getByText('1 bộ lọc')).toBeInTheDocument();
  });
});
