import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardContent, Container, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, TextFieldProps, Typography } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import ReCAPTCHA from 'react-google-recaptcha';
import { Redirect, Route, Switch, useHistory, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { Swiper, SwiperSlide } from 'swiper/react';

import ic_callender from '../../assets/Icons/ic_callender.svg';
import logo from '../../assets/Icons/logo.png';
import { HOME } from '../../navigation/Constants';
import { GunjalPatilUserDto } from '../../redux/gunjal/GunjalPatilUserDto';
import { addLoginInfo, getSelfData, makeSelfRelation } from '../../services/api/DoctorAPI';
import { getDefaultSnack } from '../../utils/SnackbarHelper';
import useStyles from './SignInStyles';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export interface ParamType {
  doctorName: string;
  doctorId: string;
  speciality: string;
}

const SignIn = () => {
  const history = useHistory();
  const params: ParamType = useParams();
  const { successSnack, failSnack, warningSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
  const classes = useStyles();
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState<Date | null>(null);

  const onMobileNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(event.currentTarget.value)) {
      return;
    }
    const mobileNo = event.currentTarget.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(mobileNo);
  };
  const handleDateChange = (date: Date | null) => {
    setDob(date);
  };
  const handleRegistration = () => {
    if (mobileNumber.length !== 10) {
      failSnack('Enter 10 digit mobile number');
      return;
    }
    const formattedDob = dob ? dob.toLocaleDateString('en-GB') : '';
    const payload = {
      phone: mobileNumber,
      firtName: firstName,
      lastName: lastName,
      dateOfBirth: formattedDob
    }
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('mobileNumber', mobileNumber);
    localStorage.setItem('dateOfBirth', formattedDob);

    addLoginInfo(payload)
      .then(response => {
        successSnack('Login succesfully');
        history.push('/home');
      })
      .catch(error => {
      });
  };

  return (
    <div className={classes.centerScreen}>
      <Container className={classes.container}>
        <div>
          <Grid container style={{
            background: '#FFFFFF',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
          >
            <Grid item >
              <div className={classes.card}>
                <img src={logo} alt='Gunjal patil bhel and misal' className={classes.logo} />
                <>
                  <Typography variant="h5" gutterBottom>
                    Registration
                  </Typography>
                  <TextField
                    className={classes.textField}
                    label="Mobile Number"
                    variant="outlined"
                    value={mobileNumber}
                    onChange={onMobileNumberChange}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10 }} />
                  <TextField
                    className={classes.textField}
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => {
                      const regex = /^[a-zA-Z0-9 ]*$/;
                      if (!regex.test(e.currentTarget.value)) {
                        return;
                      }
                      setFirstName(e.target.value);
                    }}
                  />
                  <TextField
                    className={classes.textField}
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => {
                      const regex = /^[a-zA-Z0-9 ]*$/;
                      if (!regex.test(e.currentTarget.value)) {
                        return;
                      }
                      setLastName(e.target.value);
                    }}
                  />
                  <Grid item>
                    <DatePicker
                      value={dob}
                      onChange={handleDateChange}
                      format="dd-MM-yyyy"
                      maxDate={new Date()}
                      TextFieldComponent={(props: JSX.IntrinsicAttributes & TextFieldProps) => (
                        <TextField
                          {...props}
                          fullWidth
                          className={classes.textField}
                          variant="outlined"
                          label="Date of Birth"
                          placeholder="Select Date of Birth"
                          InputProps={{
                            ...props.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <img src={ic_callender} alt="calendar" className={classes.iconAddMember} />
                              </InputAdornment>
                            ),
                            style: { fontSize: '14px' }, // Set the input text size to 14px
                          }}
                          InputLabelProps={{
                            shrink: true,
                            classes: {
                              root: classes.label,
                            },
                            style: { fontSize: '14px' }, // Set the label text size to 14px
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={handleRegistration}
                    disabled={!firstName || !lastName || !mobileNumber || !dob}
                  >
                    Register
                  </Button>
                </>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
