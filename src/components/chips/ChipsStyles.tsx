
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';

import { COLORS } from '../../styles/AppBizTheme';

export default makeStyles((theme: Theme) =>
  createStyles({
    root : {
      width : '100%',
      display : 'flex',
      // flexDirection : 'row',
      flexWrap : 'wrap',
    },     
    chip : {
      margin : '5px',
    },  
    rectangular : {
      borderRadius : '5px',
    },
    circular : {
      width : '35px',
      height : '35px',
      borderRadius : '25px',
    },
    defaultRootChipCircle : { //selected
      backgroundColor : theme.palette.primary.dark,
      border : 'none',
    },
    outlinedRootChipCircle : {
      backgroundColor : COLORS.GRAY1,
      border : 'none',
    },
    defaultRootChipRectangle : { //selected
      backgroundColor : theme.palette.primary.dark,
      border : 'none',
    },
    outlinedRootChipRectangle : {
      backgroundColor : COLORS.WHITE,
      border : `1px solid ${COLORS.BLUE1}`, 
      '&:focus' : {
        backgroundColor : COLORS.WHITE,
      },     
    },
    labelChipCircle : {
      padding : '0px',
    },

    defaultRootChipRectangleWithIcon : { //selected
      backgroundColor : theme.palette.primary.dark,
      border : 'none',
      height : '66px',
      width:'86px',
      display : 'flex',
      flexDirection : 'column',
    },
    outlinedRootChipRectangleWithIcon : {
      height : '60px',
      backgroundColor : COLORS.WHITE,
      border : `1px solid ${COLORS.BLUE1}`, 
      '&:focus' : {
        backgroundColor : COLORS.WHITE,
      },     
    },
    chipIconForRectangleWithIcon : {
      marginRight : '0px',
      marginLeft : '0px !important',   
      marginBottom:'7px',   
    },
  }),
);