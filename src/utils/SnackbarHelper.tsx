// https://github.com/iamhosseindhv/notistack#online-demo
import React from 'react';

const DEFAULT_DURATION = 2000;

export const successSnack = (enqueueSnackbar: any, closeSnackbar : any = null) => {  
  return (message: string | React.ReactNode, variantProps = {}) => {    
    enqueueSnackbar(message, {
      variant: 'success',
      autoHideDuration: DEFAULT_DURATION,
      ...variantProps,
    });
  };
};

export const failSnack = (enqueueSnackbar: any, closeSnackbar : any = null) => {
  return (message: string | React.ReactNode, variantProps = {}) => {
    enqueueSnackbar(message, {
      variant: 'error',
      autoHideDuration: DEFAULT_DURATION,
      ...variantProps,
    });
  };
};

export const warningSnack = (enqueueSnackbar: any, closeSnackbar : any = null) => {
  return (message: string | React.ReactNode, variantProps = {}) => {
    enqueueSnackbar(message, {
      variant: 'warning',
      autoHideDuration: DEFAULT_DURATION,
      ...variantProps,
    });
  };
};

export const infoSnack = (enqueueSnackbar: any, closeSnackbar : any = null) => {
  return (message: string | React.ReactNode, variantProps = {}) => {
    enqueueSnackbar(message, {
      variant: 'info',
      autoHideDuration: DEFAULT_DURATION,
      ...variantProps,
    });
  };
};

export const getDefaultSnack = (enqueueSnackbar: any, closeSnackbar : any = null) => {
  return {
    warningSnack: warningSnack(enqueueSnackbar, closeSnackbar),
    successSnack: successSnack(enqueueSnackbar, closeSnackbar),
    failSnack: failSnack(enqueueSnackbar, closeSnackbar),
    infoSnack: infoSnack(enqueueSnackbar, closeSnackbar),
  };
};
