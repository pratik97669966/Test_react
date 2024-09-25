
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    
    root : {
      width : '60px',
      backgroundColor : '#eaeaea',
      borderRadius : '30px',
      border : 'none',
    }, 
    rootLarge : {
      width : '130px',
      backgroundColor : '#eaeaea',
      borderRadius : '30px',
      border : 'none',
    }, 
    buttonLabel:{
      color :'black',
    },
    selectedButton : {
      // width : '80px',
      padding : '5px',
      marginLeft : '10px',
      color : 'red',
      transform: 'scale(1.2, 1.1)',
      zIndex : 1000,
      border : '2px solid white',
      backgroundColor : `${theme.palette.primary.dark} !important`,
      borderRadius : '30px !important',
      '&:nth-child(1)': {
        borderRadius : '30px',
      },
      '&:not(:first-child)': {
        border : '2px solid white !important',
      },
      '&:last-child': {
        borderRadius : '30px',
      },      
    },      
  }),
);