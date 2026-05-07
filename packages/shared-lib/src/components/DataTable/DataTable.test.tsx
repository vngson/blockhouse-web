import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable from './DataTable';

interface TestRow {
  id: number;
  name: string;
}

const columns = [
  { key: 'name', label: 'Tên' },
];

const data: TestRow[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

describe('DataTable', () => {
  it('renders column headers', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        page={1}
        totalItems={2}
        pageSize={10}
        onPageChange={() => {}}
      />,
    );
    expect(screen.getByText('Tên')).toBeInTheDocument();
  });

  it('renders rows with data', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        page={1}
        totalItems={2}
        pageSize={10}
        onPageChange={() => {}}
      />,
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows empty state when data is empty', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        page={1}
        totalItems={0}
        pageSize={10}
        onPageChange={() => {}}
      />,
    );
    expect(screen.getByText('Không có dữ liệu')).toBeInTheDocument();
  });

  it('shows custom empty message', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        page={1}
        totalItems={0}
        pageSize={10}
        onPageChange={() => {}}
        emptyMessage="No data here"
      />,
    );
    expect(screen.getByText('No data here')).toBeInTheDocument();
  });

  it('calls onRowClick when row clicked', async () => {
    const handleClick = jest.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        page={1}
        totalItems={2}
        pageSize={10}
        onPageChange={() => {}}
        onRowClick={handleClick}
      />,
    );
    await userEvent.click(screen.getByText('Alice'));
    expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ id: 1, name: 'Alice' }));
  });
});
