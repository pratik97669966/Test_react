
import { green, orange } from '@material-ui/core/colors';
import { createTheme, Theme, ThemeProvider } from '@material-ui/core/styles';
import { PaletteColor, PaletteColorOptions } from '@material-ui/core/styles/createPalette';

export const COLORS = {
  BLUE: '#228BAC',
  DARK_BLUE: '#102A4F',
  LIGHT_BLUE: '#F4F5FD',
  BLACK: '#000',
  WHITE: '#ffffff',
  GREEN2: '#27AE60',
  PRIMARY_RED: '#E8544B',

  RED: '#EB5757',
  GRAY1: '#EFF0F4',
  GRAY2: '#4F4F4F',
  GRAY3: '#A9B2C1',
  GRAY4: '#BDBDBD',
  GRAY5: '#E0E0E0',
  GRAY6: '#F2F2F2',

  BLUE1: '#C5D6F3',
  ORANGE: '#F2994A',
};

export const AppBizTheme = createTheme({
  overrides: {
    MuiTab: {
      root: {
        padding: '0px',
      },
    },
    MuiDialog: {
      paperFullScreen: {
        overflow: 'hidden',
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: '50px',
      },
    },
    MuiRadio: {
      checked: {
        color: COLORS.BLUE,
      },
    },
    MuiLink: {
      root: {
        color: COLORS.BLUE,
        textAlign: 'right',
        fontSize: 'small',
      },
    },
    MuiChip: {
      label: {
        maxWidth: '300px',
      },
      clickable: {
        '&:hover': {
          backgroundColor: '#bfcff0',
        },
        '&:focus': {
          backgroundColor: '#bfcff0',
        },
      },
      deletable: {
        backgroundColor: '#bfcff0',
        '&:hover': {
          backgroundColor: '#bfcff0',
        },
        '&:focus': {
          backgroundColor: '#bfcff0',
        },
      },
      // outlined :{
      //   backgroundColor : '#bfcff0',
      //   '&:hover' : {
      //     backgroundColor : '#bfcff0',
      //   },
      //   '&:focus' : {
      //     backgroundColor : '#bfcff0',
      //   },
      // },
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    h2: {
      padding: '5px',
      fontWeight: 'bold',
      fontSize: '24px',
      color: COLORS.DARK_BLUE,
      textAlign: 'left',
    },
    h3: {
      padding: '5px',
      fontWeight: 'bold',
      fontSize: '16px',
      color: COLORS.DARK_BLUE,
      textAlign: 'left',
    },
    h4: {
      textAlign: 'left',
      padding: '5px',
      fontSize: '20px',
      color: COLORS.BLUE,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    h6: {
      textAlign: 'left',
      padding: '5px',
    },
    subtitle1: {
      padding: '5px',
      fontWeight: 700,
      fontSize: '14px',
      color: COLORS.DARK_BLUE,
      textAlign: 'left',
    },
    subtitle2: {
      padding: '5px',
      fontWeight: 500,
      fontSize: '12px',
      color: COLORS.DARK_BLUE,
      textAlign: 'left',
    },
    body1: {
      padding: '5px',
      fontWeight: 500,
      fontSize: '14px',
      color: COLORS.DARK_BLUE,
      textAlign: 'left',
    },
    body2: {
      padding: '2px',
      fontWeight: 500,
      fontSize: '14px',
      color: COLORS.DARK_BLUE,
      textAlign: 'left',
    },
  },
  palette: {
    primary: {
      light: '#F4F7FE',
      main: '#228BAC',
      dark: '#bfcff0',
    },
    secondary: {
      light: '#F4F7FE',
      main: '#ffffff',
      dark: '#bfcff0',
    },
    divider: COLORS.GRAY1,
  },
});

