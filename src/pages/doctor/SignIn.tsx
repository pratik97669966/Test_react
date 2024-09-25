import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardContent, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import ReCAPTCHA from 'react-google-recaptcha';
import { Redirect, Route, Switch, useHistory, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { Swiper, SwiperSlide } from 'swiper/react';

import logo from '../../assets/Icons/logo.png';
import { HOME } from '../../navigation/Constants';
import { getSelfData, makeSelfRelation } from '../../services/api/DoctorAPI';
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
  const imageUrls = [
    'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/207601/pexels-photo-207601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];
  const history = useHistory();
  const params: ParamType = useParams();
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const { successSnack, failSnack, warningSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
  const classes = useStyles();
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP has been sent
  const [resendDisabled, setResendDisabled] = useState(true); // State to track if the resend button should be disabled
  const [countdown, setCountdown] = useState(50); // Countdown timer in seconds
  const [registrationMode, setRegistrationMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [decryptedKey, setDecryptedKey] = useState('');
  const [role, setRole] = useState('DOCTOR');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  const ImageSlider = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false, // Disable arrows
    };

    return (
      <div >
        <Slider {...settings}>
          {imageUrls.map((url, index) => (
            <div key={index}>
              <img src={url} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    setIsMobile(window.innerWidth < 768);
    if (otpSent && countdown > 0) {
      // Start the countdown timer
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      // Countdown finished, enable the resend button
      setResendDisabled(false);
    }

    return () => clearInterval(timer); // Cleanup timer on component unmount or state change
  }, [otpSent, countdown]);

  const onMobileNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(event.currentTarget.value)) {
      return;
    }
    // Allow only numbers and limit input to 10 digits
    const mobileNo = event.currentTarget.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(mobileNo);
  };

  const onOTPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and limit input to 5 digits

    const otpNumber = event.currentTarget.value.replace(/\D/g, '').slice(0, 6);
    setOtp(otpNumber);
  };
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);

    if (token) {
      setTimeout(() => {
        setRecaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }, 120000);
    }
  };

  const handleSendOtp = async () => {
    if (!recaptchaToken) {
      failSnack('Please complete the reCAPTCHA.');
      return;
    }
    try {
      await axios.post(process.env.REACT_APP_BASE_URL + '/userauth/users/v3/sign-in/' + mobileNumber, {
        requestedRole: 'PATIENT',
        platform: 'WEB',
        reCAPTCHAToken: recaptchaToken,

      }).then((response) => {
        if (response.status === 200) {
          setRecaptchaToken(null);
          setOtpSent(true); // Set otpSent to true when OTP is successfully sent
          setCountdown(50); // Reset countdown timer when OTP is sent
        } else {
        }
      }).catch(function (error) {
        if (error.response) {
          if (error.response && error.response.status === 404) {
            setRecaptchaToken(null);
            setRegistrationMode(true); // Activate registration mode when user is not found
            failSnack('User Not Registered');
          }
        } else if (error.request) {
        } else {
        }
      });
    } catch (error) {
    }
  };
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const data2 = new FormData();
    data2.append('scope', 'openid');
    data2.append('grant_type', 'password');
    data2.append('username', mobileNumber);
    data2.append('password', otp);
    const responce = await axios({
      method: 'post',
      url: process.env.REACT_APP_BASE_URL + '/userauth/oauth/token',
      headers: {
        'Authorization': 'Basic ' + btoa('qup-business:bus$6web$#'),
      },
      withCredentials: true,
      data: data2,
    }).then(async (responce) => {
      const mainResponse = responce;
      setOtp('');
      localStorage.setItem('token', mainResponse.data.access_token);
      localStorage.setItem('mobileNumber', mobileNumber);
      localStorage.setItem('expires_in', mainResponse.data.expires_in);
      localStorage.setItem('refresh_token', mainResponse.data.refresh_token);
      localStorage.setItem('login_mobile_number', mainResponse.data.access_token);
      getSelfData()
        .then((selfResponse) => {
          makeSelfRelation(selfResponse.data.userId, selfResponse.data.firstName, selfResponse.data.lastName, selfResponse.data.mobileNumber)
            .then((response) => {
              const drId = localStorage.getItem('doctorId');
              successSnack('Login Succesfully');
              localStorage.setItem('selfData', JSON.stringify(selfResponse.data));
              history.push('/home');
            })
            .catch(error => {
              localStorage.removeItem('token');
              localStorage.removeItem('mobileNumber');
              localStorage.removeItem('expires_in');
              localStorage.removeItem('refresh_token');
              localStorage.removeItem('login_mobile_number');
            });
        })
        .catch(error => {
          console.error('Error fetching clinics:', error);
        });

    }).catch(function (error) {
      if (error.response) {
        if (error.response && error.response.status === 401) {
          failSnack('Wrong OTP');
        } else {
        }
      } else if (error.request) {

      } else {

      }
    });
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL + '/userauth/users/v2/regenerate-otp/' + mobileNumber)
        .then((responce) => {
          setResendDisabled(true);
          setOtpSent(true);
          setCountdown(50);
          setOtp('');
          successSnack('OTP Re-Send Succesfully');
        }).catch(function (error) {
          if (error.response) {
            const errorDescription = error.response.data.error_description + '';
            const errorCode = errorDescription.split(':::')[0];
            const errorMessage = errorDescription.split(':::')[1];

            failSnack(errorMessage);

          } else {
          }
        });
    } catch (error) {

    }
  };
  const handleRegistration = async () => {
    if (!recaptchaToken) {
      failSnack('Please complete the reCAPTCHA.');
      return;
    }
    try {
      await axios.post(process.env.REACT_APP_BASE_URL + '/userauth/users/v3/sign-up', {
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
        preferredLanguageId: '',
        requestedRole: role,
        token: decryptedKey,
        platform: 'WEB',
        reCAPTCHAToken: recaptchaToken,
      }).then((response) => {
        if (response.status === 200) {
          setOtpSent(true);
          setRegistrationMode(false);
          setCountdown(50);
          setFirstName('');
          setLastName('');
        } else {
        }
      }).catch(function (error) {
        if (error.response) {
          if (error.response) {
            const errorDescription = error.response.data.error_description + '';
            const errorCode = errorDescription.split(':::')[0];
            const errorMessage = errorDescription.split(':::')[1];
            failSnack(errorMessage);
          } else {
          }
        }
      });
    } catch (error) {
    }
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
                <img src={logo} alt='At Your Service' className={classes.logo} />
                {registrationMode ? (
                  <>
                    <Typography variant="h5" gutterBottom>
                      Registration
                    </Typography>
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
                    <FormControl variant="outlined" className={classes.textField}>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value as string)}
                        label="Select Role"
                      >
                        <MenuItem value="DOCTOR">DOCTOR</MenuItem>
                        <MenuItem value="RECEPTIONIST">RECEPTIONIST</MenuItem>
                      </Select>
                    </FormControl>
                    <div className={classes.recaptchaContainer}>
                      <ReCAPTCHA
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
                        onChange={handleRecaptchaChange}
                      />
                    </div>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={handleRegistration}
                      disabled={!firstName || !role}
                    >
                      Register
                    </Button>
                  </>
                ) : (
                  <>
                    {!otpSent && (
                      <><TextField
                        className={classes.textField}
                        label="Mobile Number"
                        variant="outlined"
                        value={mobileNumber}
                        onChange={onMobileNumberChange}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10 }} />
                        <div className={classes.recaptchaContainer}>
                          <ReCAPTCHA
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
                            onChange={handleRecaptchaChange} />
                        </div></>
                    )}
                    {!otpSent && (
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={handleSendOtp}
                        disabled={!mobileNumber || mobileNumber.length !== 10}
                      >
                        Send OTP
                      </Button>
                    )}
                  </>
                )}
                {otpSent && (
                  <>
                    <TextField
                      className={classes.textField}
                      label="OTP"
                      fullWidth
                      variant="outlined"
                      value={otp}
                      onChange={onOTPChange}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 6 }}
                    />
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={handleVerifyOtp}
                      disabled={!otp || otp.length !== 6}
                    >
                      Verify OTP
                    </Button>
                    {resendDisabled ? (
                      <Button className={classes.button} variant="contained" color="primary" disabled>
                        Resend OTP ({countdown})
                      </Button>
                    ) : (
                      <Button className={classes.button} variant="contained" color="primary" onClick={handleResendOtp}>
                        Resend OTP
                      </Button>
                    )}
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );

};

export default SignIn;
