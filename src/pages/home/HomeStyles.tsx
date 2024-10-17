import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '430px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '0px',
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
    [theme.breakpoints.down('sm')]: {
      padding: '0',
      alignItems: 'flex-start',
    },
  },
  scrollableContent: {
    width: '100%',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
  },
  logo: {
    width: '100%',
  },
  horizontalScroll: {
    display: 'flex',
    overflowX: 'auto',

    '& .slick-slide': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  card: {
    flex: '0 0 auto',
    margin: '10px',
    height: 'auto',
    width: '60%',
    boxSizing: 'border-box',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    backgroundPosition: 'center',
    transition: 'transform 0.5s',
    cursor: 'pointer',
  },
  circleCard: {
    flex: '0 0 auto',
    margin: '10px',
    height: 100,
    width: 100,
    boxSizing: 'border-box',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    backgroundPosition: 'center',
    transition: 'transform 0.5s',
    cursor: 'pointer',
  },
  hoeizontalCard: {
    marginLeft: '10px',
    marginRight: '10px',
    height: 'auto',
    width: '-webkit-fill-available',
    borderRadius: '10px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.5s',
    cursor: 'pointer',
  },
  activeCard: {
    transform: 'scale(1.1)',
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
  root: {
    flexGrow: 1,
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: '2px 4px',
    margin: theme.spacing(2, 0),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
  },
  inputRoot: {
    flexGrow: 1,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
  banner: {
    margin: theme.spacing(2, 0),
  },
  bannerImage: {
    height: '250px',
  },

  categoryTabs: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  categoryIcon: {
    textAlign: 'center',
  },
  recommendedSection: {
  },
  cardMedia: {
    height: 140,
  },
  categoriesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: theme.spacing(2),
  },
  productsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },

}));

export default useStyles;
