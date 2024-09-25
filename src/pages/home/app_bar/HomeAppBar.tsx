import React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory, useParams } from 'react-router-dom';

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
          <Grid container onClick={onMenuChangeLocationClick} style={{ marginTop: '10px', flexWrap: 'nowrap' }}>
            <Grid item>
              <img
                style={{ height: '24px' }}
                src={ic_location}
                alt="Location"
              />
            </Grid>
            <Grid item>
              <div>
                <Grid container>
                  <Grid item>
                    <Typography variant="body2" style={{ height: '24px', marginLeft: '4px', marginRight: '4px', color: '#000000', fontSize: '14px' }}>{props.address ? props.address.type : ''}</Typography>
                  </Grid>
                  <Grid item>
                    <img
                      src={ic_down_arrow}
                      alt='select location'
                    />
                  </Grid>
                </Grid>
                <Typography variant="body2" style={{
                  marginLeft: '4px',
                  color: '#4F4F4F',
                  maxWidth: '300px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  height: '24px',
                  marginTop: '0px',
                  marginRight: '4px'
                }}>{props.address ? props.address.displayAddress : ''}</Typography>
              </div>
            </Grid>
          </Grid>
          <Typography variant="body2" onClick={onMenuLogoutClick} style={{ cursor: 'pointer', height: '24px', marginRight: '4px', color: '#A7A7A7', fontSize: '12px' }}>LOGOUT</Typography>
        </Toolbar>
      </AppBar>
    </div >
  );
}
