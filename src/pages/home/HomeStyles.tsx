import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '430px',
    minHeight: 'auto',
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
    overflowY: 'auto',
    backgroundColor: '#ffffff',
    padding: '20px',
    height: '100vh',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
      alignItems: 'flex-start',
    },
  },
  scrollableContent: {
    maxHeight: 'calc(100vh - 80px)',
    overflowY: 'scroll',
    width: '100%',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
  },
  logo: {
    width: '100%',

  },
  slider: {
    width: '100%',
  },
  slide: {
    margin: '40px',
    transition: 'transform 0.5s',
  },
  activeSlide: {
    marginTop: '40px',
    marginBottom: '40px',
    marginLeft: '0 auto',
    marginRight: '0 auto',
    transform: 'scale(1.1)', // Adjust the scale as needed
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
}));

export default useStyles;
