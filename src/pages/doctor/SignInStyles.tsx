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
      minHeight: 'auto',
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
      height: 'auto',
      [theme.breakpoints.down('sm')]: {
        padding: '0',
        alignItems: 'flex-start',
      },
    },
    toggleButtonGroup: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: 'flex',
      fontSize: '14px',
      justifyContent: 'center',
      '& .MuiToggleButton-root': {
        margin: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&.Mui-selected': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
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
    iconAddMember: {
      color: '#5F6368',
    },
    field: {
      marginBottom: '10px',
      '& .MuiInputBase-root': {
        height: '50px', // Set the height to 74px
        fontSize: '14px', // Set the inside text size to 14px
      },
      '& .MuiInputAdornment-root': {
        marginTop: '0px', // Ensure icon aligns correctly
      },
    },
    label: {
      fontSize: '16px',
      color: '#78879E',
    },
  }),
);
