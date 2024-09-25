import * as React from 'react';
import { Box, Button,  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import { getLanguageTranslate } from '../../i18n';

export interface ConfirmationDialogProps{
    title:string;
    message:string;
    onClose:(isOk:boolean)=>void;
    open:boolean;
}

export const  ConfirmationDialog = (props:ConfirmationDialogProps) =>{
  const { onClose, open, ...other } = props;
  //const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    // if (!open) {
    //   setValue(valueProp);
    // }
  }, []);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      //radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    props.onClose(false);
  };

  const handleOk = () => {
    props.onClose(true);
  };

  //   const handleChange = (event) => {
  //     setValue(event.target.value);
  //   };

  return (
    <Dialog
      //sx={{ width: '80%', maxHeight: 435 }}
      maxWidth="xl"
      style={{top:'0px'}}
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle style={{padding:'5px 0px 0px 16px', color:'#000000'}}>
        {/* <Box> */}
        <label style={{padding:'15px'}}>  {props.title} </label>
        <IconButton onClick={handleCancel} style={{padding: '0px',  color:'#000000'}}>
          <CloseIcon fontSize="large"  />
        </IconButton>
        {/* </Box> */}
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{display:'flex', justifyContent:'center'}}>
          <Typography variant="h4">
            {props.message}
          </Typography>
        </Box>
        <Box sx={{display:'flex', justifyContent:'center'}}>
          <IconButton>
            <DeleteIcon fontSize="large" style={{ color: '#FFEEEE', fontSize:'6rem' }} />
          </IconButton>
        </Box>
      </DialogContent>
      <DialogActions style={{justifyContent:'space-between'}}>
        {/* <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button> */}
        <Button onClick={handleCancel} variant="contained" >
          {getLanguageTranslate('components.cms.cancel')}
        </Button>
        <Button onClick={handleOk} variant="contained" color="primary">
          {getLanguageTranslate('components.cms.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// export default function ConfirmationDialog() {
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState('Dione');

//   const handleClickListItem = () => {
//     setOpen(true);
//   };

//   const handleClose = (newValue) => {
//     setOpen(false);

//     if (newValue) {
//       setValue(newValue);
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//       <List component="div" role="group">
//         <ListItem button divider disabled>
//           <ListItemText primary="Interruptions" />
//         </ListItem>
//         <ListItem
//           button
//           divider
//           aria-haspopup="true"
//           aria-controls="ringtone-menu"
//           aria-label="phone ringtone"
//           onClick={handleClickListItem}
//         >
//           <ListItemText primary="Phone ringtone" secondary={value} />
//         </ListItem>
//         <ListItem button divider disabled>
//           <ListItemText primary="Default notification ringtone" secondary="Tethys" />
//         </ListItem>
//         <ConfirmationDialogRaw
//           id="ringtone-menu"
//           keepMounted
//           open={open}
//           onClose={handleClose}
//           value={value}
//         />
//       </List>
//     </Box>
//   );
// }
