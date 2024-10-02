import React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory, useParams } from 'react-router-dom';

import logo from '../../../assets/Icons/logo.png';
import { getLanguageTranslate } from '../../../i18n';
import { Address } from '../../../redux/dtos/Address';
import ic_down_arrow from './../../../assets/Icons/ic_down_arrow.svg';
import ic_location from './../../../assets/Icons/ic_location.svg';
import useStyles from './HomeAppBarStyles';

interface OwnProps {
  children?: React.ReactNode;
  onLogout: () => void;
  onChangeLocation: () => void;
  address?: Address;
}

export default function SearchAppBar(props: OwnProps) {
  const classes = useStyles();
  const onMenuHomeClick = () => { };
  const history = useHistory();

  const onMenuSettingsClick = () => {
  };
  const onMenuLogoutClick = () => {
    props.onLogout();
  };
  const onMenuChangeLocationClick = () => {
    props.onChangeLocation();
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <img
            style={{ height: '64px' }}
            src={logo}
            alt="Gunjal Patil"
          />
          {/* <Typography variant="body2" onClick={onMenuLogoutClick} style={{ cursor: 'pointer', height: '24px', marginRight: '4px', color: '#A7A7A7', fontSize: '12px' }}>LOGOUT</Typography> */}
        </Toolbar>
      </AppBar>
    </div >
  );
}
