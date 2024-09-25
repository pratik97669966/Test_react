import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import { AppBizTheme } from '../../styles/AppBizTheme';
import MainContainer from '../mainContainer/MainContainer';

import '../../utils/DropConsole';
import './WebQUpAppBiz.css';


function WebQUpAppBiz() {
  return (
    <div id="WebQUpAppBizId" className="App">
      <ThemeProvider theme={AppBizTheme}>
        {/* <AbacProvider
            user={props.user}
            roles={props.user.roles}
            rules={rules}
            permissions={props.user.permissions}
          >
            <MainContainer></MainContainer>

          </AbacProvider> */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
            <MainContainer></MainContainer>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
}

export default WebQUpAppBiz;
