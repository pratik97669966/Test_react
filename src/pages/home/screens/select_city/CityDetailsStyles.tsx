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
    color: '#0F2951',
    marginLeft: theme.spacing(2),
  },
  searchField: {
  },
  geosuggestContainer: {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    maxHeight: '200px',
    overflowY: 'auto',
    borderRadius: '20px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    backgroundColor: '#ffffff',
    zIndex: 1000,
  },
  suggestItem: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: theme.spacing(0.5),
    borderRadius: '12px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  locationButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '20px',
    width: '100%',
    background: '#1A998E',
    color: '#ffffff',
    textTransform: 'none',
  },
  savedAddressTitle: {
    marginTop: theme.spacing(2),
    color: '#0F2951',
  },
  savedAddress: {
    marginTop: theme.spacing(1),
    color: '#555555',
    cursor: 'pointer'
  },
  patientInfo: {
    padding: '10px',
    marginTop: '10px',
    borderRadius: 6,
    cursor: 'pointer',
    border: '1px solid #EAEAEA',
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
