import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0px 5px 0px 5px',
      width: 'calc(100% - 10px)',
    },
    option: {
      // Hover with light-grey
      padding: '10px',
      '&[data-focus="true"]': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      // Selected has dark-grey
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
    },
    textField: {
      '& .MuiFormLabel-root': {
        color: 'lightgray',
      },
    },
  }),
);
