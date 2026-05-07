import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthSelector from './MonthSelector';

describe('MonthSelector', () => {
  it('renders current month and year', () => {
    render(
      <MonthSelector month={null} year={null} onMonthChange={() => {}} onYearChange={() => {}} />,
    );
    const now = new Date();
    const monthName = `Tháng ${now.getMonth() + 1}`;
    expect(screen.getByText(new RegExp(monthName))).toBeInTheDocument();
  });

  it('calls onMonthChange and onYearChange on prev button click', () => {
    const handleMonth = jest.fn();
    const handleYear = jest.fn();
    render(
      <MonthSelector month={6} year={2024} onMonthChange={handleMonth} onYearChange={handleYear} />,
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]); // prev button
    expect(handleMonth).toHaveBeenCalledWith(5);
    expect(handleYear).toHaveBeenCalledWith(2024);
  });

  it('calls onMonthChange and onYearChange on next button click', () => {
    const handleMonth = jest.fn();
    const handleYear = jest.fn();
    render(
      <MonthSelector month={6} year={2024} onMonthChange={handleMonth} onYearChange={handleYear} />,
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]); // next button
    expect(handleMonth).toHaveBeenCalledWith(7);
    expect(handleYear).toHaveBeenCalledWith(2024);
  });

  it('shows clear filter button when filter is active', () => {
    render(
      <MonthSelector month={5} year={2024} onMonthChange={() => {}} onYearChange={() => {}} />,
    );
    expect(screen.getByText('Xoá lọc')).toBeInTheDocument();
  });

  it('does not show clear filter when no filter active', () => {
    render(
      <MonthSelector month={null} year={null} onMonthChange={() => {}} onYearChange={() => {}} />,
    );
    expect(screen.queryByText('Xoá lọc')).not.toBeInTheDocument();
  });
});
