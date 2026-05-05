import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
  } from '@mui/material';

  interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
  }

  export default function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = 'Xác nhận',
    cancelLabel = 'Huỷ',
    onConfirm,
    onCancel,
  }: ConfirmDialogProps) {
    return (
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>{cancelLabel}</Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }