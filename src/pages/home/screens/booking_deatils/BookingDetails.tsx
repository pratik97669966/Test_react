import React, { useState } from 'react';
import { Button, Container, Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Checkbox, FormControlLabel } from '@mui/material';
import moment from 'moment-timezone';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import ic_edit_change from '../../../../assets/Icons/ic_edit_change.svg';
import logo from '../../../../assets/Icons/logo.png';
import { InitiatePaymentPayload } from '../../../../redux/dtos/InitChatPaymentData';
import { PatientData } from '../../../../redux/dtos/PatientData';
import { SelectedDoctor } from '../../../../redux/dtos/SelectedDoctor';
import { UserServiceLocation } from '../../../../redux/dtos/UserServiceLocation';
import { SelfData } from '../../../../redux/opdDtos/SelfData';
import { BookingRequest } from '../../../../redux/opdDtos/SlotDataDto';
import { addAddress, addExtraInfo, addPaymentInitiatApi, addPaymentUpdateApi, appointmentStatusCheck, bookConsultationAppointment, getOrderId, getRazorPayOrderId, updateAppointmentStatus } from '../../../../services/api/DoctorAPI';
import { getDefaultSnack } from '../../../../utils/SnackbarHelper';
import useStyles from './BookingDetailsStyles';

const BookingDetails: React.FC = () => {

  const classes = useStyles();
  const history = useHistory();
  const { successSnack, failSnack, warningSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
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
    history.goBack();
  };
  const goToPatientEdit = () => {
    history.push('/update-family-member');
  };
  const goToAddressEdit = () => {
    history.push('/update-choose-address');
  };
  const goToSymtomEdit = () => {
    history.push('/update-select-complaint');
  };
  const handleChangeSlotClick = () => {
    history.goBack();
  };
  const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setChecked(event.target.checked);
  };
  const handleSaveClick = async () => {
    const slotSummaryId = localStorage.getItem('selected-slot-summary-id');
    const mainSlotId = localStorage.getItem('selected-main-slot-id');
    if (checked) {
      const onlineConsultationBookingBean = {
        bookedFamilyMemberFirstName: selectedFamilyMember?.firstName,
        bookedFamilyMemberId: selectedFamilyMember?.familyMemberId,
        bookedFamilyMemberLastName: selectedFamilyMember?.lastName,
        bookedFamilyMemberMobileNumber: selectedFamilyMember?.mobileNumber,
        bookingInitiatedThrough: 'THROUGH_APP',
        doctorFullName: selectedDoctor?.doctorFullName,
        doctorId: selectedDoctor?.doctorId,
        location: selectedAddress?.address,
        mainSlotId: mainSlotId,
        parentPatientId: selfData?.userId,
        parentPatientMobileNumber: selfData?.mobileNumber,
        patientBookingRequestId: selectedFamilyMember?.patientAppUserId,
        relationName: selectedFamilyMember?.relationInfo.relationName,
        slotSummaryId: slotSummaryId,
        timeSlotId: selectedMicroSlot?.id,
      };

      try {
        const bookConsultationAppointmentResponse = await bookConsultationAppointment(onlineConsultationBookingBean);
        const appointmentStatusCheckBean = {
          bookedFamilyMemberId: onlineConsultationBookingBean.bookedFamilyMemberId,
          mainSlotId: onlineConsultationBookingBean.mainSlotId,
          parentPatientId: onlineConsultationBookingBean.parentPatientId,
          summarySlotId: onlineConsultationBookingBean.slotSummaryId,
          timeSlotId: onlineConsultationBookingBean.timeSlotId,
        };

        await new Promise(resolve => setTimeout(resolve, 1500));

        const appointmentStatusCheckResponse = await appointmentStatusCheck(appointmentStatusCheckBean);

        const extraInfoPayload = {
          address: selectedAddress?.address,
          city: selectedAddress?.city,
          country: selectedAddress?.country,
          landmark: selectedAddress?.landmark,
          locality: selectedAddress?.locality,
          noteFromUser: note,
          onlineConsultationBookingId: appointmentStatusCheckResponse.data.id,
          postalCode: selectedAddress?.postalCode,
          state: selectedAddress?.postalCode,
          symptoms: symptoms,
          type: selectedAddress?.type,
        };

        await addExtraInfo(extraInfoPayload);

        const razorPayOrderIdResponse = await getRazorPayOrderId(generateRandomString(), consultationCharges + '');
        const orderId = razorPayOrderIdResponse.data.razorpay_order_id + '';

        const initiatePaymentPayload: InitiatePaymentPayload = {
          chatPaymentId: appointmentStatusCheckResponse.data.id,
          doctorId: selectedDoctor?.doctorId,
          patientId: selfData?.userId,
          paymentStatus: 'INITIATED',
          transactionDate: Number(Date.now()),
          patientMobileNumber: onlineConsultationBookingBean.parentPatientMobileNumber,
          totalAmount: Number(consultationCharges),
          timeSlotId: onlineConsultationBookingBean.timeSlotId,
          summaryId: onlineConsultationBookingBean.slotSummaryId + '',
          paymentMode: 'RAZOR_PAY',
          razorPayOrderId: orderId,
          bookingSlotDatePerUTC: new Date(appointmentStatusCheckResponse.data.bookingSlotDatePerUTC).toISOString(),
        };

        const addPaymentInitiatApiData = await addPaymentInitiatApi(initiatePaymentPayload);
        openRZP(orderId, addPaymentInitiatApiData.data, appointmentStatusCheckBean);

      } catch (error: any) {
        if (error.response && error.response.status === 412) {
          failSnack('Cannot allocate booking, this position is already booked by another patient');
        } else {
          console.error(error);
          failSnack('An error occurred. Please try again.');
        }
      }
    } else {
      warningSnack('Accept terms & conditions first');
    }
  };
  const generateRandomString = (): string => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < 24; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const openRZP = (orderId: string, addPaymentInitiatApiData: any, appointmentStatusCheckBean: any) => {
    const options = {
      key: 'rzp_test_kf3XAPAICibetF',
      amount: (consultationCharges !== null ? parseFloat(consultationCharges) : 0) * 100,
      currency: 'INR',
      name: 'Gunjal patil bhel and misal',
      description: 'Consultation Fee',
      image: 'https://atyourservice.homes/wp-content/uploads/2024/08/AYS-logo-new-theme-02-02-Small.png',
      order_id: orderId,
      handler: function (response: any) {
        if (addPaymentInitiatApiData) {
          const updatedPaymentPayload = {
            chatPaymentId: addPaymentInitiatApiData.chatPaymentId,
            doctorId: addPaymentInitiatApiData.doctorId,
            patientId: addPaymentInitiatApiData.patientId,
            chatStatus: 'OPEN',
            paymentStatus: 'PURCHASED',
            totalAmount: addPaymentInitiatApiData.totalAmount,
            timeSlotId: appointmentStatusCheckBean.timeSlotId,
            summaryId: appointmentStatusCheckBean.summarySlotId,
            paymentMode: addPaymentInitiatApiData.paymentMode,
            transactionDate: new Date(addPaymentInitiatApiData.bookingSlotDatePerUTC).toISOString() + ""
          };
          addPaymentUpdateApi(updatedPaymentPayload)
            .then(response => {
              successSnack('Appointment booked succesfully');
              history.push('/booking-details');
            })
            .catch(error => {
              // Handle error if necessary
            });
        }
      },
      prefill: {
        name: `${selfData?.firstName} ${selfData?.lastName}`,
        email: `${selfData?.emailId}`,
        contact: `${selfData?.mobileNumber}`,
      },
      notes: {
        address: '',
      },
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: function () {
          if (addPaymentInitiatApiData) {
            const updatedPaymentPayload = {
              chatPaymentId: addPaymentInitiatApiData.chatPaymentId,
              doctorId: addPaymentInitiatApiData.doctorId,
              patientId: addPaymentInitiatApiData.patientId,
              paymentStatus: 'CANCELLED',
              transactionDate: new Date(addPaymentInitiatApiData.bookingSlotDatePerUTC).toISOString() + "",
              totalAmount: addPaymentInitiatApiData.totalAmount,
              timeSlotId: addPaymentInitiatApiData.timeSlotId,
              summaryId: addPaymentInitiatApiData.summaryId,
              paymentMode: addPaymentInitiatApiData.paymentMode,
            };
            addPaymentUpdateApi(updatedPaymentPayload)
              .then(response => {
              })
              .catch(error => {
                // Handle error if necessary
              });
            updateAppointmentStatus('FAILURE', appointmentStatusCheckBean)
              .then(response => {
              })
              .catch(error => {

              });
          }
        },
      },
    };

    try {
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
      failSnack('There was an error initializing Razorpay. Please try again.');
    }
  };

  return (
    <div className={classes.centerScreen}>
      <Container className={classes.container}>
        <div>
          <Grid container direction="column">
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <IconButton onClick={handleBackClick}>
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h6" className={classes.title}>Confirm Booking Details</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <div className={classes.patientInfo}>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>Patient Name</Typography>
                      </Grid>
                      <Grid item>
                        <img onClick={goToPatientEdit} src={ic_edit_change} style={{ cursor: 'pointer' }} alt="change" />
                      </Grid>
                    </Grid>
                    <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }} variant="h6">{`${selectedFamilyMember?.firstName} ${selectedFamilyMember?.lastName}`}</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>Address</Typography>
                      </Grid>
                      <Grid item>
                        <img onClick={goToAddressEdit} src={ic_edit_change} style={{ cursor: 'pointer' }} alt="change" />
                      </Grid>
                    </Grid>
                    <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }} variant="h5">{selectedAddress?.address}</Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.patientInfo}>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>Doctor Home Visit Slot time</Typography>
                      </Grid>
                      <Grid item>
                        <img onClick={handleChangeSlotClick} src={ic_edit_change} style={{ cursor: 'pointer' }} alt="change" />
                      </Grid>
                    </Grid>
                    <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }} variant="h6">{`${formatDateBasedOnToday(selectedMicroSlot?.bookingSlotDateAsFormattedStringPerIST ? selectedMicroSlot?.bookingSlotDateAsFormattedStringPerIST : "")},${getTimeFromSeconds(selectedMicroSlot?.startTime ? selectedMicroSlot?.startTime : 0)}`}</Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.patientInfo}>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>Complaints</Typography>
                      </Grid>
                      <Grid item>
                        <img onClick={goToSymtomEdit} src={ic_edit_change} style={{ cursor: 'pointer' }} alt="change" />
                      </Grid>
                    </Grid>
                    <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }} variant="h6">{symptoms.join(', ')}</Typography>
                  </Grid>
                  {note.length !== 0 && (
                    <Grid item>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>User Note</Typography>
                        </Grid>
                      </Grid>
                      <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }} variant="h6">{note}</Typography>
                    </Grid>
                  )}
                </Grid>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.patientInfo}>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <FormControlLabel
                          control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
                          label={<Typography style={{ color: '#1A998E', fontSize: '12px', padding: '0px', margin: 0 }}>I agree to the terms and conditions</Typography>}
                        />
                      </Grid>
                      <Grid item>
                        <a
                          href="https://atyourservice.homes/privacy-policy/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}
                        >
                          <Typography style={{ cursor: 'pointer', color: '#1A998E', fontSize: '12px', padding: '0px', margin: 0 }} > Read </Typography>
                        </a>
                      </Grid>
                    </Grid>

                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', background: '#ECF4F4', paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10, marginLeft: -20, marginRight: -20, marginBottom: 10
        }}>
          <Typography style={{ color: '#374151', fontStyle: 'bold', fontSize: '14px', padding: '0px', margin: 0 }}>{`Doctor Home Visit Fee: ₹ ${consultationCharges}`}</Typography>
        </div>
        <Button variant="contained" onClick={handleSaveClick} color="primary" className={classes.saveButton}>{`Pay ₹${consultationCharges}`}</Button>
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
const formatDateBasedOnToday = (utcIsoString: string | number | Date) => {
  const inputDate = new Date(utcIsoString);
  const currentDate = new Date();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(currentDate.getDate() + 1);

  // Helper function to check if two dates have the same day, month, and year
  const isSameDay = (date1: Date, date2: Date) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  if (isSameDay(inputDate, currentDate)) {
    return "Today";
  } else if (isSameDay(inputDate, tomorrowDate)) {
    return "Tomorrow";
  } else {
    const formattedDate = inputDate.toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    return formattedDate;
  }
};
export default BookingDetails;
