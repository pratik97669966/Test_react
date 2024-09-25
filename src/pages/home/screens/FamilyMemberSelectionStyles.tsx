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
    overflow: 'hidden',
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
  scrollableGrid: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    maxHeight: 'calc(80vh - 72px)', // Adjust based on your layout
  },
  familyMembersContainer: {
    flexGrow: 1,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  addFamilyMembersContainer: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
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
  title: {
    alignItems: 'center',
    color: '#0F2951',
  },
  card: {
    marginBottom: '10px',
    borderRadius: 6,
    border: '1px solid #EAEAEA',
    cursor: 'pointer',
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
}));

export default useStyles;
