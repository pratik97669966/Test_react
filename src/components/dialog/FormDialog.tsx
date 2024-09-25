import React, { ReactNode } from 'react';
import { Button, createStyles, DialogActions, IconButton, makeStyles, Theme } from '@material-ui/core';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px 25px',       
    },        
  }),
);

interface OwnProps {
  children: ReactNode;
  open: boolean;
  onCloseDialog: () => void;
  title: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  showCloseIcon?: boolean;
  fullscreen?: boolean;   
}

export default function FormDialog(props: OwnProps) {
  const classes = useStyles();

  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('body');

  const handleClose = () => {
    props.onCloseDialog();
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

  return (
    <div id="formdialogContainer">
      <Dialog
        id="dialogContainer"
        maxWidth={props.maxWidth ? props.maxWidth : 'md'}
        fullWidth={props.fullscreen ? props.fullscreen : false}
        open={props.open}
        onClose={handleClose}
        disableBackdropClick={true}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle disableTypography id="scroll-dialog-title" className={classes.titleContainer}>
          <h2>{props.title}</h2>
          {props.showCloseIcon !== false && (
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          {props.children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
