
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';

import { COLORS } from '../../styles/AppBizTheme';

export default makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);