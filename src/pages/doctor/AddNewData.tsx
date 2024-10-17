import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, TextFieldProps, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import ic_callender from '../../assets/Icons/ic_callender.svg';
import logo from '../../assets/Icons/logo.png';
import { addData } from '../../services/api/DoctorAPI';
import { getDefaultSnack } from '../../utils/SnackbarHelper';
import useStyles from './SignInStyles';

const AddNewData = () => {
  const history = useHistory();
  const { successSnack, failSnack, warningSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
  const classes = useStyles();
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [dob, setDob] = useState<Date | null>(new Date());
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [deliveryCharges, setDeliveryCharges] = useState('');
  const [address, setAddress] = useState('');
  const [branch, setBranch] = useState('Jakhuri');
  const [comboPack, setComboPack] = useState('Single');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(2999);
  const [comboPrice, setComboPrice] = useState(2999);
  const [paidAmount, setPaidAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Online');
  const [note, setNote] = useState('');
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  useEffect(() => {
    let basePrice = 2999;
    switch (comboPack) {
      case 'Double':
        basePrice = 5900;
        break;
      case 'Triple':
        basePrice = 8800;
        break;
    }
    setComboPrice(basePrice);
    const totalDeliveryCharges = parseFloat(deliveryCharges || '0');
    const finalPrice = basePrice * quantity + totalDeliveryCharges;
    setPrice(finalPrice);
  }, [comboPack, deliveryCharges, quantity]);

  const pendingAmount = price - parseFloat(paidAmount || '0');

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
  const handleDeliveryDate = (date: Date | null) => {
    setDeliveryDate(date);
  };
  const openAllDataList = () => {
    history.push('/all-data')
  };
  const handleSave = async () => {
    if (mobileNumber.length !== 10) {
      failSnack('Enter 10 digit mobile number');
      return;
    }
    const formattedDob = dob ? dob.toLocaleDateString('en-GB') : '';
    const formattedDeliveryDate = deliveryDate ? deliveryDate.toLocaleDateString('en-GB') : '';
    const payload = {
      phone: mobileNumber,
      firstName: firstName,
      dateOfBirth: formattedDob,
      address,
      branch,
      comboPack,
      qty: quantity,
      price: price,
      comboPrice: comboPrice,
      paidAmount: parseFloat(paidAmount),
      pendingAmount,
      paymentMode,
      note,
      deliveryCharges,
      deliveryDate: formattedDeliveryDate,
      status: ""
    };
    try {
      await axios.post('https://gunjalpatilserver.onrender.com/data', payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        if (response.status === 200) {
          setFirstName('');
          setMobileNumber('');
          setAddress('');
          setDeliveryDate(null);
          setDeliveryCharges('');
          setPaidAmount('');
          setNote('');
          setQuantity(1);
          setDob(new Date())
          successSnack('Added successfully');
        } else {
          failSnack('Failed to add data');
        }
      }).catch((error) => {
        if (error.response) {
          failSnack('Failed to add data');
        } else {
          failSnack('Failed to add data due to network error');
        }
      });
    } catch (error) {
      failSnack('An unexpected error occurred');
    }
  };

  return (
    <div className={classes.centerScreen}>
      <Container className={classes.container}>
        <div>
          <Grid
            container
            style={{
              background: '#FFFFFF',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}
          >
            <Grid item>
              <div className={classes.card}>
                <img src={logo} alt='Gunjal patil bhel and misal' className={classes.logo} />
                <Typography variant="h5" gutterBottom>
                  Registration
                </Typography>
                <TextField
                  className={classes.textField}
                  label="Mobile Number"
                  variant="outlined"
                  value={mobileNumber}
                  onChange={onMobileNumberChange}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10 }}
                />
                <TextField
                  className={classes.textField}
                  label="Customer Name"
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
                  label="Address"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <InputLabel>Branch</InputLabel>
                <Select
                  className={classes.textField}
                  value={branch}
                  onChange={(e) => setBranch(e.target.value as string)}
                  variant="outlined"
                >
                  <MenuItem value="Jakhuri">Jakhuri</MenuItem>
                  <MenuItem value="Ashwi">Ashwi</MenuItem>
                  <MenuItem value="Couriour">Couriour</MenuItem>
                  <MenuItem value="OtherTransport">Other Transport</MenuItem>
                </Select>
                <ToggleButtonGroup
                  className={classes.toggleButtonGroup}
                  value={comboPack}
                  exclusive
                  onChange={(e: any, value: React.SetStateAction<string>) => {
                    if (value) setComboPack(value);
                  }}
                >
                  <ToggleButton value="Single">Single</ToggleButton>
                  <ToggleButton value="Double">Double</ToggleButton>
                  <ToggleButton value="Triple">Triple</ToggleButton>
                </ToggleButtonGroup>
                <InputLabel>Quantity</InputLabel>
                <Select
                  className={classes.textField}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value as string, 10))}
                  variant="outlined"
                >
                  {numbers.map((number) => (
                    <MenuItem key={number} value={number}>
                      {number}
                    </MenuItem>
                  ))}
                </Select>
                <Grid item>
                  <DatePicker
                    value={deliveryDate}
                    onChange={handleDeliveryDate}
                    format="dd-MM-yyyy"
                    minDate={new Date()}
                    TextFieldComponent={(props: JSX.IntrinsicAttributes & TextFieldProps) => (
                      <TextField
                        {...props}
                        fullWidth
                        className={classes.textField}
                        variant="outlined"
                        label="Delivery Date"
                        placeholder="Select Delivery Date"
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
                <TextField
                  className={classes.textField}
                  label="Delivery Charges"
                  variant="outlined"
                  value={deliveryCharges}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDeliveryCharges(value);
                  }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <TextField
                  className={classes.textField}
                  label="Price"
                  variant="outlined"
                  value={price}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  className={classes.textField}
                  label="Amount Paid"
                  variant="outlined"
                  value={paidAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPaidAmount(value);
                  }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <TextField
                  className={classes.textField}
                  label="Pending Amount"
                  variant="outlined"
                  value={pendingAmount}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <InputLabel>Payment Mode</InputLabel>
                <Select
                  className={classes.textField}
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value as string)}
                  variant="outlined"
                >
                  <MenuItem value="Online">Online</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
                </Select>
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
                        label="Booking Date"
                        placeholder="Select Booking Date"
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
                <TextField
                  className={classes.textField}
                  label="Note"
                  variant="outlined"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <Grid container spacing={3} style={{ margin: '10px 0px' }}>
                  <Grid item xs={6}>
                    <Button fullWidth variant="contained" color="primary" disabled={!firstName || !mobileNumber || !dob || !address || !branch || !comboPack || !paidAmount} onClick={handleSave}>
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button fullWidth variant="contained" color="secondary" onClick={openAllDataList}>
                      View All Data
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default AddNewData;
