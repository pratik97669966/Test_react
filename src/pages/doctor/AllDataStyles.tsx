import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  searchField: {
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
