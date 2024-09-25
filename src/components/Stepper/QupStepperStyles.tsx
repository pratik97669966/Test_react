
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';

import { COLORS } from '../../styles/AppBizTheme';

export default makeStyles((theme: Theme) =>
  createStyles({
    leftSideMenu : {
      width : '100px',
    },    
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
      height : '40px',
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    stepLabel : {
      flexDirection : 'column',
      textAlignLast:'center',     
    },
    iconContainer : {
      paddingRight : '0px',
    },
    stepContent : {
      // height : '100px',
      borderLeft : `3px solid ${COLORS.ORANGE}`,
      marginLeft : '58px',
    },
    stepperRoot : {
      padding : '0px',
      // height : '100%',
    },
  }),
);