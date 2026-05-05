import { Chip } from '@mui/material';

  interface StatusBadgeProps {
    status: number;
  }

  const STATUS_MAP: Record<number, { label: string; color: 'success' | 'default' }> = {
    1: { label: 'Hoạt động', color: 'success' },
    0: { label: 'Ngưng', color: 'default' },
  };

  export default function StatusBadge({ status }: StatusBadgeProps) {
    const config = STATUS_MAP[status] || { label: 'Không rõ', color: 'default' as const };
    return <Chip label={config.label} color={config.color} size="small" />;
  }