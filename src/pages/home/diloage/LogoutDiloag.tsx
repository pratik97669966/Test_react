import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="logout-dialog-title"
      PaperProps={{
        style: {
          minWidth: '400px',
          minHeight: '200px',
        },
      }}
    >
      <DialogTitle id="logout-dialog-title">
        <Typography variant="h6" align="center">
          LOGOUT
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" align="center">
          Are you sure you want to log out?
        </Typography>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'flex-end' }}>
        <Button onClick={onConfirm} style={{color:'GrayText'}}>
          Yes
        </Button>
        <Button onClick={onClose} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
