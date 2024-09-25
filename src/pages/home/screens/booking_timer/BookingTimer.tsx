import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Container, Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { useHistory } from 'react-router-dom';

import ic_call from '../../../../assets/Icons/ic_call.svg';
import ic_message from '../../../../assets/Icons/ic_message.svg';
import { PatientData } from '../../../../redux/dtos/PatientData';
import { SelectedDoctor } from '../../../../redux/dtos/SelectedDoctor';
import { UserServiceLocation } from '../../../../redux/dtos/UserServiceLocation';
import { SelfData } from '../../../../redux/opdDtos/SelfData';
import { BookingRequest } from '../../../../redux/opdDtos/SlotDataDto';
import useStyles from './BookingTimerStyles';

const BookingTimer: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const noteString = localStorage.getItem('complaint-note');
  const [note, setNote] = useState(noteString ? noteString : '');
  const selfDataString = localStorage.getItem('selfData');
  const selfData: SelfData | null = selfDataString ? JSON.parse(selfDataString) : null;
  const selectedFamilyMemberString = localStorage.getItem('selected-family-member');
  const selectedFamilyMember: PatientData | null = selectedFamilyMemberString ? JSON.parse(selectedFamilyMemberString) : null;
  const selectedAddressString = localStorage.getItem('selected-address');
  const selectedAddress: UserServiceLocation | null = selectedAddressString ? JSON.parse(selectedAddressString) : null;
  const [checked, setChecked] = useState(false);
  const selectedSymptomString = localStorage.getItem('selected-symptom');
  const consultationCharges = localStorage.getItem('consultation-charges');
  const selectedSymptom: string[] = selectedSymptomString ? JSON.parse(selectedSymptomString) : [];
  const selectedDoctorString = localStorage.getItem('selected-doctor');
  const selectedDoctor: SelectedDoctor | null = selectedDoctorString ? JSON.parse(selectedDoctorString) : null;
  const selectedMicroSlotString = localStorage.getItem('selected-micro-slot');
  const selectedMicroSlot: BookingRequest | null = selectedMicroSlotString ? JSON.parse(selectedMicroSlotString) : null;
  const [symptoms, setSymptoms] = useState<string[]>(selectedSymptom);

  const handleBackClick = () => {
    history.push('/home');
  };
  const goToHomeScreen = () => {
    history.push('/home');
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
            <Typography variant="h6" className={classes.title}>Visit Details</Typography>
          </Grid>
        </Grid>
        <div className={classes.circle}>
          <div className={classes.circleContent}>
            <p className={classes.circleText}>Visiting Doctor</p>
            <h2 className={classes.doctorName}>{selectedDoctor?.doctorFullName}</h2>
            <p className={classes.circleText}>Visiting Time</p>
            <h3 className={classes.visitingTime}>{`${getTimeFromSeconds(selectedMicroSlot?.startTime ? selectedMicroSlot?.startTime : 0)}`}</h3>
          </div>
        </div>
        <div className={classes.otherCard}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>Patient Name</Typography>
              <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }} variant="h6">{`${selectedFamilyMember?.firstName} ${selectedFamilyMember?.lastName}`}</Typography>
            </Grid>
            <Grid item>
              <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>Selected Address</Typography>
              <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }} variant="h5">{`${selectedAddress?.address}`}</Typography>
            </Grid>
          </Grid>
        </div>
        <div className={classes.otherCard}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>Complaints</Typography>
              <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }} variant="h6">{symptoms.join(', ')}</Typography>
            </Grid>
            <Grid item>
              <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>Note</Typography>
              <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }} variant="h6">{note}</Typography>
            </Grid>
          </Grid>
        </div>
        <div className={classes.otherCard}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>Payment Details</Typography>
              <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }} variant="h6">{`Amount Paid = ₹${consultationCharges}`}</Typography>
            </Grid>
          </Grid>
        </div>
        <div >
          <Grid container className={classes.paymentCard} spacing={1}>
            <Grid item>
              <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>Need Help?</Typography>
            </Grid>
            <Grid item xs></Grid>
            <Grid item >
              <Grid container spacing={1}>
                <Grid item>
                  <img
                    style={{ height: '40px' }}
                    src={ic_message}
                    alt="message"
                  />
                </Grid>
                <Grid item>
                  <img
                    style={{ height: '40px' }}
                    src={ic_call}
                    alt="call"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Button variant="contained" color="primary" onClick={goToHomeScreen} className={classes.nextButton}>
          Go To Home
        </Button>
      </Container>
    </div>
  );
};
const getTimeFromSeconds = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;
  return formattedTime;
};
export default BookingTimer;
