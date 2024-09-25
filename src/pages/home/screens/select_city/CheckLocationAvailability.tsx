import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

import ic_location_check from '../../../../assets/Icons/ic_location_check.svg';
import ic_not_found from '../../../../assets/Icons/ic_not_found.png';
import useStyles from './CheckLocationAvailabilityStyles';

const CheckLocationAvailability = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isAvailable, setIsAvailable] = useState(true);
  const handleBackClick = () => {
    history.goBack();
  };
  // Automatically navigate to /home after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAvailable) {
        setIsAvailable(false);
      }
    }, 4000); // 2 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [history]);

  return (
    <div className={classes.centerScreen}>
      <Container className={classes.container}>
        <Grid container alignItems="center" className={classes.header}>
          <Grid item>
            <IconButton onClick={handleBackClick}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
        </Grid>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px', textAlign: 'center' }}>
          {!isAvailable ? (
            <>
              <img src={ic_not_found} alt="Doctor Icon" style={{ width: '150px', marginBottom: '20px' }} />
              <Typography variant="h5">We’re Not Here Yet!</Typography>
              <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '20px' }}>
                Stay tuned for updates on when we’ll be available in your area!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.nextButton}
                onClick={handleBackClick}
              >
                Change Location
              </Button>
            </>
          ) : (
            <>
              <img src={ic_location_check} alt="Doctor Icon" style={{ width: '150px', marginBottom: '10px' }} />
              <Typography variant="body1" style={{ color: '#26A9B1', marginBottom: '20px' }}>
                Loading Your Location
              </Typography>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CheckLocationAvailability;
