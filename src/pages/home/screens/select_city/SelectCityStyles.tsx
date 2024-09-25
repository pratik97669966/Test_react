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
  },
  title: {
    color: '#0F2951',
  },
  cityList: {
    marginTop: theme.spacing(2),
  },
  cityItem: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: '10px',
    border: '1px solid #ECF4F4',
    padding: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ECF4F4',
    },
  },
  cityIcon: {
    backgroundColor: '#1A998E',
    marginRight: theme.spacing(2),
  },
  cityName: {
    color: '#0F2951',
  },
}));

export default useStyles;
