
  import React from 'react';
  import { ConfirmDialog } from '@blockhouse/shared-lib';
  import { Employee, EmployeeStatus } from '../../types/employee.types';

  interface EmployeeEditFormProps {
    open: boolean;
    employee: Employee | null;
    onConfirm: () => Promise<void>;
    onCancel: () => void;
  }

  export default function EmployeeEditForm({ open, employee, onConfirm, onCancel }: EmployeeEditFormProps) {
    if (!employee) return null;

    const isActive = employee.status === EmployeeStatus.ACTIVE;
    const title = isActive ? 'Ngưng hoạt động' : 'Kích hoạt';
    const message = isActive
      ? `Bạn có chắc muốn ngưng hoạt động nhân viên "${employee.name}"?`
      : `Bạn có chắc muốn kích hoạt lại nhân viên "${employee.name}"?`;

    return (
      <ConfirmDialog
        open={open}
        title={title}
        message={message}
        confirmLabel={isActive ? 'Ngưng' : 'Kích hoạt'}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );
  }