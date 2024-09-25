import React, { useState } from 'react';
import { Avatar, Container, Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

import { CityResponse } from '../../../../redux/dtos/CityResponse';
import { getActiveArea } from '../../../../services/api/DoctorAPI';
import useStyles from './SelectCityStyles';

const SelectCity = () => {
  const classes = useStyles();
  const history = useHistory();
  const [areas, setAreas] = useState<CityResponse>();

  React.useEffect(() => {
    getActiveArea()
      .then((response) => {
        setAreas(response.data);
      })
      .catch(error => {
        console.error('Error fetching clinics:', error);
      });
  }, []);
  const handleBackClick = () => {
    history.goBack();
  };

  const handleCityClick = (city: string) => {
    localStorage.setItem('selected_city', city);
    history.push('/select-city-details');
  };

  return (
    <div className={classes.centerScreen}>
      <Container className={classes.container}>
        <Grid container alignItems="center" className={classes.header}>
          <Grid item>
            <IconButton onClick={handleBackClick}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.title}>Select City</Typography>
          </Grid>
        </Grid>
        <Grid container direction="column" spacing={2} className={classes.cityList}>
          {areas?.city.map((city: any) => (
            <Grid item key={city} onClick={() => handleCityClick(city)} className={classes.cityItem}>
              <Avatar className={classes.cityIcon} />
              <Typography variant="body1" className={classes.cityName}>{city}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default SelectCity;
