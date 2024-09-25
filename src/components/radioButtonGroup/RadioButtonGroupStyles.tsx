
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';

import { COLORS } from '../../styles/AppBizTheme';

export default makeStyles((theme: Theme) =>
  createStyles({
    root : {
      width : '100%',
      display : 'flex',
      flexDirection : 'row',
      flexWrap : 'wrap',
      justifyContent : 'space-around',
    },
    rootColumn : {
      width : '100%',
      display : 'flex',
      flexDirection : 'column',
      flexWrap : 'wrap',
      justifyContent : 'left',
    },
    labelTypo:{
      padding:'2px',
    },     
  }),
);