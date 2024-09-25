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
              <img
                style={{ height: '64px' }}
                src='https://scontent.fpnq13-1.fna.fbcdn.net/v/t39.30808-6/322265450_1289066275268466_3115324486332684405_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=3gXUTcGSXhIQ7kNvgEZgz57&_nc_ht=scontent.fpnq13-1.fna&oh=00_AYCY0fPTMP4m311r_8FWyA2fup5wD4gPIfomG6k1zWeflA&oe=66FA5F5B'
                alt="Gunjal Patil"
              />
          {/* <Typography variant="body2" onClick={onMenuLogoutClick} style={{ cursor: 'pointer', height: '24px', marginRight: '4px', color: '#A7A7A7', fontSize: '12px' }}>LOGOUT</Typography> */}
        </Toolbar>
      </AppBar>
    </div >
  );
}
