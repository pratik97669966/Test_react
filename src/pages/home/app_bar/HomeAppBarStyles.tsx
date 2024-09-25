
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '430px',
      flexGrow: 1,
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(0, 2), // Add padding for better spacing
    },
    locationContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    locationIcon: {
      height: '24px',
    },
    locationText: {
      marginLeft: '4px',
      maxWidth: '300px',
      color: '#4F4F4F',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    typeText: {
      marginLeft: '4px',
      color: '#000000',
      fontSize: '14px',
    },
    logoutText: {
      color: '#A7A7A7',
      fontSize: '12px',
      cursor: 'pointer',
      marginRight: theme.spacing(2), // Add margin to prevent clipping
    },
  }),
);