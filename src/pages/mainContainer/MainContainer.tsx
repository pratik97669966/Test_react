import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';

import { history } from '../../navigation/History';
import { RouterConfig } from '../../navigation/RouterConfig';
import { getDefaultSnack } from '../../utils/SnackbarHelper';
import useStyles from './MainContainerStyles';

interface OwnProps{
    someProp? : string;
}

interface StateProps {
  globalErrorMessage : string | null;
}

interface DispatchProps {
  resetErrorMessage: () => void;
}

type Props =   OwnProps;

const MainContainer = (props : Props) => {
  const classes = useStyles();
  const { successSnack, failSnack, warningSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);

  //div => box
  return (
    <Box id="mainContainer" className={classes.root}>
      <Router history={history}>
        <RouterConfig></RouterConfig>
      </Router>
    </Box>
  );
};

export default MainContainer;
