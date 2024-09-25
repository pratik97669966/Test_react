import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '430px',
      minHeight: 'calc(100vh - 80px)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      boxSizing: 'border-box',
      marginBottom: '42px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '20px',
      backgroundColor: '#ffffff',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      scrollbarWidth: 'none',
    },
    centerScreen: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: '20px',
      paddingBottom: theme.spacing(2),
      height: '100vh',
      [theme.breakpoints.down('sm')]: {
        padding: '0',
        alignItems: 'flex-start',
      },
    },
    sliderContainer: {
      borderRadius: '45px', // Rounded corners (top)
      objectFit: 'cover',
      width: '60vw', // Adjust width as needed
      position: 'relative',
      overflow: 'hidden',
      '& .slick-prev, & .slick-next': {
        display: 'none !important', // Hide default arrows
      },
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    card: {
      padding: theme.spacing(3),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textField: {
      marginBottom: theme.spacing(2),
      width: '100%',
    },
    button: {
      marginBottom: theme.spacing(2),
      width: '100%',
      marginTop: '20px',
      borderRadius: '20px',
      bottom: theme.spacing(2),
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#357A7B',
    },
    resendButton: {
      marginTop: '20px',
      width: '100%',
      borderRadius: '20px',
      bottom: theme.spacing(2),
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#357A7B',
    },
    logo: {
      width: '150px',
      marginBottom: theme.spacing(3),
    },
    recaptchaContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '10px',
    },
  }),
);
