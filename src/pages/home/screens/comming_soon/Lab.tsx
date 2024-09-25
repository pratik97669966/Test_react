import React from 'react';
import { Container, Grid, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

import ic_lab_test from '../../../../assets/Icons/ic_lab_test.png';
import useStyles from './CommingSoonStyles';

const Lab = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <div className={classes.centerScreen}>
      <Container className={classes.container}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container alignItems="center" style={{ marginBottom: '10px' }}>
              <Grid item>
                <IconButton onClick={handleBackClick}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.imageContainer}>
            <img src={ic_lab_test} alt="Center Image" className={classes.centerImage} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Lab;
