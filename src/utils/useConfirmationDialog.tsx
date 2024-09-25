import { useCallback, useState } from 'react';

interface DialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
}

export const useConfirmationDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogProps | null>(null);

  const showDialog = useCallback((title: string, description: string, onConfirm: () => void) => {
    setDialogProps({ title, description, onConfirm });
    setDialogOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    if (dialogProps?.onConfirm) {
      dialogProps.onConfirm();
    }
    setDialogOpen(false);
  }, [dialogProps]);

  const handleCancel = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return {
    dialogOpen,
    dialogProps,
    showDialog,
    handleConfirm,
    handleCancel,
  };
};
