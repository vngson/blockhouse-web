import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  it('renders with default placeholder', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Tìm kiếm...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchInput value="" onChange={() => {}} placeholder="Custom..." />);
    expect(screen.getByPlaceholderText('Custom...')).toBeInTheDocument();
  });

  it('displays current value', () => {
    render(<SearchInput value="hello" onChange={() => {}} />);
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const handleChange = jest.fn();
    render(<SearchInput value="" onChange={handleChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'test');
    expect(handleChange).toHaveBeenCalled();
  });
});
