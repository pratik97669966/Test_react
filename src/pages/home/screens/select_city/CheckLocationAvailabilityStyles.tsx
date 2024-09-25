import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '430px',
    minHeight: 'calc(100vh - 80px)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
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
  header: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: '#0F2951',
    marginLeft: theme.spacing(2),
  },
  nextButton: {
    marginTop: '20px',
    borderRadius: '20px',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    background: '#357A7B',
  },
}));

export default useStyles;
