import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '430px',
    minHeight: 'auto',
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
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  centerScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '20px',
    height: '100vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
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
    alignItems: 'center',
    color: '#0F2951',
  },
  headerText: {
    alignItems: 'center',
    color: '#0F2951',
    fontSize: '14px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  locationText: {
    color: '#000000',
    fontStyle: 'bold',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  addressTypeLabel: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  toggleButtonGroup: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  toggleButton: {
    '&.Mui-selected': {
      backgroundColor: '#ECF4F4',
      color: '#357A7B',
    },
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
  formControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
}));

export default useStyles;
