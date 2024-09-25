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
  patientInfo: {
    marginTop: '10px',
    padding: '10px',
    borderRadius: 8,
    border: '1px solid #ECF4F4',
    background: '#ECF4F4'
  },
  otherCard: {
    marginTop: '10px',
    padding: '10px',
    borderRadius: 8,
    border: '1px solid #EAEAEA'
  },
  paymentCard: {
    marginTop: '10px',
    padding: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    border: '1px solid #EAEAEA'
  },
  card: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  label: {
    color: '#888888',
    marginBottom: theme.spacing(1),
  },
  value: {
    color: '#0F2951',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  text: {
    color: '#333333',
    marginBottom: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(2),
  },
  iconButton: {
    color: '#0F2951',
  },
  nextButton: {
    marginTop: '50px',
    borderRadius: '20px',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    background: '#357A7B',
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: '50%',
    backgroundColor: '#ECF4F4',
    border : `2px solid #EAEAEA`,
    margin: '0 auto 20px auto',
    position: 'relative',
  },
  circleContent: {
    textAlign: 'center',
  },
  circleText: {
    margin: '5px 0',
    fontSize:'12px',
    color: '#1a1a1a',
  },
  doctorName: {
    fontSize: '1.2rem',
    color: '#000000',
    margin: '10px 0',
  },
  visitingTime: {
    fontSize: '1rem',
    color: '#000000',
  },
  details: {
    marginBottom: theme.spacing(2),
  },
  detailItem: {
    padding: theme.spacing(1),
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    marginBottom: theme.spacing(1),
  },
  detailTitle: {
    margin: 0,
    fontSize: '0.9rem',
    color: '#757575',
  },
  detailText: {
    margin: '5px 0 0 0',
    fontSize: '1rem',
    color: '#212121',
  },
  footer: {
    textAlign: 'center',
  },
  footerIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
