import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    checkboxUnchecked: {
      color: '#A9B2C1',
    },
    checkboxChecked: {
      color: '#228BAC !important',
      marginBottom: '0px',
      marginTop: '0px',
    },
    checkboxlabel: {
      padding: '0px;',
      paddingTop: '0px',
      paddingLeft: '0px',
      paddingBottom: '0px',
    },
    active: {
      background: '#f0f2f5',
      borderRadius: '13px',
    },
  }),
);
