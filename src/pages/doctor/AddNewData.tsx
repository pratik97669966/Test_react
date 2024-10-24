import React, { useEffect, useState } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, TextFieldProps, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import ic_callender from '../../assets/Icons/ic_callender.svg';
import logo from '../../assets/Icons/logo.png';
import { addData } from '../../services/api/DoctorAPI';
import { getDefaultSnack } from '../../utils/SnackbarHelper';
import { BillData } from './AllData';
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
  const [fromWho, setFromWho] = useState('Pradeep');
  const [comboPack, setComboPack] = useState('Single');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(2999);
  const [comboPrice, setComboPrice] = useState(2999);
  const [paidAmount, setPaidAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Online');
  const [note, setNote] = useState('');
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BillData>();

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
    history.push('/all-data');
  };
  const handleSave = async () => {
    if (mobileNumber.length !== 10) {
      failSnack('Enter 10 digit mobile number');
      return;
    }
    const formattedDob = dob ? dob : '';
    const formattedDeliveryDate = deliveryDate ? deliveryDate : '';
    const payload = {
      phone: mobileNumber,
      firstName: firstName,
      dateOfBirth: formattedDob,
      address,
      branch,
      comboPack,
      qty: quantity,
      price: price,
      fromWho: fromWho,
      comboPrice: comboPrice,
      paidAmount: parseFloat(paidAmount),
      pendingAmount,
      paymentMode,
      note,
      deliveryCharges,
      deliveryDate: formattedDeliveryDate,
      status: pendingAmount <= 0 ? "Paid" : "",
    };
    try {
      await axios.post('https://gunjalpatilserver.onrender.com/data', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status === 200) {
          setSelectedItem(response.data);
          setFirstName('');
          setMobileNumber('');
          setAddress('');
          setDeliveryDate(null);
          setDeliveryCharges('');
          setPaidAmount('');
          setNote('');
          setQuantity(1);
          setDob(new Date());
          successSnack('Added successfully');
          setOpenDialog(true);
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
  const handleDialogClose = (p0: boolean) => {
    setOpenDialog(false);
    const item = selectedItem;
    if (item && p0) {
      const formattedDateOfBirth = item.dateOfBirth ? new Date(item.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
      const formattedDeliveryDate = item.deliveryDate ? new Date(item.deliveryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';

      const message = `
  *गुंजाळ पाटील भेळ व मिसळ*
    
  पत्ता:
  58/2, गुंजाळ पाटील कॉर्नर,
  जाखुरी, ता. संगमनेर, जि. अहिल्यानगर. 422605
  संपर्क क्रमांक: 
  8888147262 , 9923469913
    
  *प्रिय सर/मॅडम*,
  आपल्या दिवाळी फराळ बुकिंगबद्दल धन्यवाद! 🙏 
  कृपया आपल्या ऑर्डरचे बिल तपासा:
    
  ${formattedDateOfBirth ? 'तारीख: ' + formattedDateOfBirth : ''}
  बिल क्रमांक: ${item.id}
  *ग्राहकाचे नाव: ${item.firstName}*
  संपर्क क्रमांक: ${item.phone}
    
  ऑर्डर तपशील:
    
  ${item.comboPack} Combo Pack
  नग: ${item.qty}
  किंमत: ${item.comboPrice}/- रुपये
  ${parseFloat(item.deliveryCharges) > 0 ? 'डिलिव्हरी चार्जेस: ' + item.deliveryCharges + '/- रुपये' : ''} 
    
  *एकूण रक्कम: ${item.price}/- रुपये*
    
  जमा रक्कम: ${item.paidAmount}/- रुपये
  
  *शिल्लक रक्कम: ${item.pendingAmount}/- रुपये*
    
  अभिनंदन ${item.firstName} आपल्या दिवाळीच्या फराळाची बुकिंग झालेली आहे.
  ${formattedDeliveryDate ? 'आपला कोम्बो पॅक घेण्याची अंदाजे तारीख: ' + formattedDeliveryDate : ''}
  
  आमच्या सेवांचा लाभ घेतल्याबद्दल धन्यवाद..! 🙏 
    
  🪔🪔🪔 आपणास आणि आपल्या संपूर्ण परिवाराला दिवाळीच्या खूप खूप शुभेच्छा! 🪔🪔🪔
    
  आदरपूर्वक,
  *गुंजाळ पाटील भेळ व मिसळ*
  
  आमच्याबद्दल अधिक जाणून घेण्यासाठी खालील लिंकवर क्लिक करून आमच्या व्हॉट्सऍप ग्रुपला जॉईन करा.
  https://chat.whatsapp.com/L52wkjvPjkMCNhGldT9Fdb

  तसेच आमच्या इंस्टाग्राम पेजला फॉलो करा.
  https://www.instagram.com/gunjal_patil_bhel_and_misal/profilecard/?igsh=YzE3a2hqcGh4OW40
`;

      const url = `https://api.whatsapp.com/send?phone=+91${item.phone}&text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
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
                <InputLabel>Generated By</InputLabel>
                <Select
                  className={classes.textField}
                  value={fromWho}
                  onChange={(e) => setFromWho(e.target.value as string)}
                  variant="outlined"
                >
                  <MenuItem value="Pradeep">Pradeep</MenuItem>
                  <MenuItem value="Amol">Amol</MenuItem>
                  <MenuItem value="Pratiksha">Pratiksha</MenuItem>
                  <MenuItem value="Anna">Anna</MenuItem>
                </Select>
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
      {/* Dialog for confirmation */}
      <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>जतन झाले</DialogTitle>
        <DialogContent>
          <DialogContentText>
            व्हॉट्सऍप
            व्हा उघडायचे आहे का?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            नाही
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary">
            होय
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewData;
