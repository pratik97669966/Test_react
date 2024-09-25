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
  addressList: {
    flexGrow: 1,
  },
  addNewAddress: {
    width: '100%',
    padding: '10px',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    borderColor: '#4caf50',
    color: '#4caf50',
  },
  addressCard: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: theme.spacing(1),
  },
  proceedButton: {
    backgroundColor: '#008080',
    color: '#ffffff',
    alignSelf: 'center',
    width: '90%',
    padding: theme.spacing(1.5),
    borderRadius: '30px',
  },
  patientInfo: {
    padding: '10px',
    marginTop: '10px',
    borderRadius: 6,
    cursor: 'pointer',
    border: '1px solid #EAEAEA',
  },
  selectedCard: {
    backgroundColor: '#ECF4F4',
    borderRadius: 6,
    border: '1px solid #1A998E',
  },
  cardContent: {
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(2),
    backgroundColor: '#1A998E', // Apply the same color to all avatars
  },
  cardText: {
    fontSize: '1rem',
  },
  addText: {
    color: '#1A998E',
  },
  card: {
    borderRadius: 6,
    border: '1px solid #EAEAEA',
    cursor: 'pointer',
  },
}));

export default useStyles;
