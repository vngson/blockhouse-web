import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberStepper from './NumberStepper';

describe('NumberStepper', () => {
  it('renders with initial value', () => {
    render(<NumberStepper value={5} onChange={() => {}} />);
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('increments value on + button click', () => {
    const handleChange = jest.fn();
    render(<NumberStepper value={5} onChange={handleChange} step={1} />);
    const buttons = screen.getAllByRole('button');
    const incrementBtn = buttons[buttons.length - 1];
    fireEvent.click(incrementBtn);
    expect(handleChange).toHaveBeenCalledWith(6);
  });

  it('decrements value on - button click', () => {
    const handleChange = jest.fn();
    render(<NumberStepper value={5} onChange={handleChange} step={1} />);
    const buttons = screen.getAllByRole('button');
    const decrementBtn = buttons[0];
    fireEvent.click(decrementBtn);
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('uses custom step value', () => {
    const handleChange = jest.fn();
    render(<NumberStepper value={5000} onChange={handleChange} step={1000} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);
    expect(handleChange).toHaveBeenCalledWith(6000);
  });

  it('disables decrement at min boundary', () => {
    render(<NumberStepper value={1} onChange={() => {}} min={1} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
  });

  it('disables increment at max boundary', () => {
    render(<NumberStepper value={10} onChange={() => {}} max={10} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[buttons.length - 1]).toBeDisabled();
  });

  it('clamps decrement to min', () => {
    const handleChange = jest.fn();
    render(<NumberStepper value={1500} onChange={handleChange} step={1000} min={1000} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(handleChange).toHaveBeenCalledWith(1000);
  });

  it('clamps increment to max', () => {
    const handleChange = jest.fn();
    render(<NumberStepper value={9500} onChange={handleChange} step={1000} max={10000} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);
    expect(handleChange).toHaveBeenCalledWith(10000);
  });

  it('commits typed value on blur', () => {
    const handleChange = jest.fn();
    render(<NumberStepper value={1000} onChange={handleChange} />);
    const input = screen.getByDisplayValue('1000');
    fireEvent.change(input, { target: { value: '5000' } });
    fireEvent.blur(input);
    expect(handleChange).toHaveBeenCalledWith(5000);
  });

  it('falls back to min on empty input blur', () => {
    const handleChange = jest.fn();
    render(<NumberStepper value={1000} onChange={handleChange} min={1000} />);
    const input = screen.getByDisplayValue('1000');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(handleChange).toHaveBeenCalledWith(1000);
  });

  it('disables all buttons when disabled prop is true', () => {
    render(<NumberStepper value={5} onChange={() => {}} disabled />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });
});
