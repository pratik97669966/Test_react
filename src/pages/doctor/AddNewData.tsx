import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
  Typography,
} from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import ic_callender from '../../assets/Icons/ic_callender.svg';
import logo from '../../assets/Icons/logo.png';
import { getDefaultSnack } from '../../utils/SnackbarHelper';
import { BillData } from './AllData';
import { generateInvoicePDF } from './invoiceUtils';
import useStyles from './SignInStyles';

const useLoaderStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
const AddNewData = () => {
  const history = useHistory();
  const { successSnack, failSnack } = getDefaultSnack(
    useSnackbar().enqueueSnackbar,
  );
  const classes = useStyles();
  const loaderClasses = useLoaderStyles();

  // -------- Form State --------
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [dob, setDob] = useState<Date | null>(new Date());
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [deliveryCharges, setDeliveryCharges] = useState('');
  const [discount, setDiscount] = useState('');
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

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BillData>();
  const [loading, setLoading] = useState(false);

  const pdfRef = useRef<HTMLDivElement>(null);

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  // -------- Price Calculation --------
  useEffect(() => {
    let basePrice = 3100;
    switch (comboPack) {
      case 'Double':
        basePrice = 6100;
        break;
      case 'Triple':
        basePrice = 9100;
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
    if (!regex.test(event.currentTarget.value)) return;
    const mobileNo = event.currentTarget.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(mobileNo);
  };

  const handleDateChange = (date: Date | null) => setDob(date);
  const handleDeliveryDate = (date: Date | null) => setDeliveryDate(date);

  const openAllDataList = () => history.push('/all-data');

  // -------- PDF Utilities --------
  const createPdfBlob = useCallback((item: BillData) => {
    try {
      const pdf = generateInvoicePDF(item);
      return pdf.output('blob');
    } catch (err) {
      console.error('pdf blob error', err);
      return null;
    }
  }, []);

  const sharePdf = useCallback(async (item: BillData) => {
    const blob = createPdfBlob(item);
    if (!blob) {
      failSnack('Failed to prepare invoice');
      return;
    }
    const file = new File([blob], `Invoice_${item.id}.pdf`, { type: 'application/pdf' });
    try {
      if ((navigator as any).canShare && (navigator as any).canShare({ files: [file] })) {
        await (navigator as any).share({
          title: '',
          text: '',
          files: [file],
        });
      } else {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      }
    } catch (err) {
      console.error('Share fallback', err);
      failSnack('Share failed');
    }
  }, [createPdfBlob, failSnack]);

  // -------- Save Handler --------
  const handleSave = async () => {
    if (mobileNumber.length !== 10) {
      failSnack('Enter 10 digit mobile number');
      return;
    }

    const formattedDob = dob ? dob : '';
    const formattedDeliveryDate = deliveryDate ? deliveryDate : '';
    const payload = {
      phone: mobileNumber,
      firstName,
      dateOfBirth: formattedDob,
      address,
      branch,
      comboPack,
      qty: quantity,
      price,
      fromWho,
      comboPrice,
      discount,
      paidAmount: parseFloat(paidAmount),
      pendingAmount,
      paymentMode,
      note,
      deliveryCharges: parseFloat(deliveryCharges || '0'),
      deliveryDate: formattedDeliveryDate,
      status: pendingAmount <= 0 ? 'Paid' : '',
    };

    setLoading(true);
    try {
      const response = await axios.post(
        'https://gunjalpatilserver.onrender.com/data',
        payload,
        { headers: { 'Content-Type': 'application/json' } },
      );

      if (response.status === 200) {
        setSelectedItem(response.data);
        // Reset form
        setFirstName('');
        setMobileNumber('');
        setAddress('');
        setDeliveryDate(null);
        setDeliveryCharges('');
        setPaidAmount('');
        setDiscount('');
        setNote('');
        setQuantity(1);
        setDob(new Date());
        successSnack('Added successfully');
        setOpenDialog(true);
      } else {
        failSnack('Failed to add data');
      }
    } catch (error) {
      console.error(error);
      failSnack('An unexpected error occurred');
    }
    setLoading(false);
  };

  // -------- WhatsApp Message --------
  const handleWhatsApp = useCallback(() => {
    if (!selectedItem) return;
    const item = selectedItem;

    const formattedDateOfBirth = item.dateOfBirth
      ? new Date(item.dateOfBirth).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      : '';
    const formattedDeliveryDate = item.deliveryDate
      ? new Date(item.deliveryDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      : '';
    const grandTotal = item.price + (item.deliveryCharges || 0);

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
किंमत: ${item.comboPrice?.toFixed(2)}/- रुपये
${item.deliveryCharges && item.deliveryCharges > 0
    ? `डिलिव्हरी चार्जेस: ${item.deliveryCharges.toFixed(2)}/- रुपये`
    : ''}

*एकूण रक्कम (Delivery सहित): ${grandTotal.toFixed(2)}/- रुपये*
    
जमा रक्कम: ${item.paidAmount.toFixed(2)}/- रुपये
  
*शिल्लक रक्कम: ${item.pendingAmount.toFixed(2)}/- रुपये*
    
अभिनंदन ${item.firstName} आपल्या दिवाळीच्या फराळाची बुकिंग झालेली आहे.
${formattedDeliveryDate ? 'आपला कोम्बो पॅक घेण्याची अंदाजे तारीख: ' + formattedDeliveryDate : ''}
  
आमच्या सेवांचा लाभ घेतल्याबद्दल धन्यवाद..! 🙏 
🪔🪔🪔 आपणास आणि आपल्या संपूर्ण परिवाराला दिवाळीच्या खूप खूप शुभेच्छा! 🪔🪔🪔
    
आदरपूर्वक,
*गुंजाळ पाटील भेळ व मिसळ*
`;

    const url = `https://api.whatsapp.com/send?phone=+91${item.phone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }, [selectedItem]);

  return (
    <div className={classes.centerScreen}>
      <Backdrop className={loaderClasses.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
                  label="Discount"
                  variant="outlined"
                  value={discount}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDiscount(value);
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
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={
                        !firstName ||
                        !mobileNumber ||
                        !dob ||
                        !address ||
                        !branch ||
                        !comboPack ||
                        !paidAmount
                      }
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      onClick={openAllDataList}
                    >
                      View All Data
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>

      </Container>

      {/* Hidden PDF Template */}
      <div style={{ display: 'none' }}>
        <div ref={pdfRef}>
          <h2>Invoice</h2>
          <p>Name: {selectedItem?.firstName}</p>
          <p>Phone: {selectedItem?.phone}</p>
          <p>Combo: {selectedItem?.comboPack}</p>
          <p>Qty: {selectedItem?.qty}</p>
          <p>Total: {selectedItem?.price}</p>
          <p>Paid: {selectedItem?.paidAmount}</p>
          <p>Pending: {selectedItem?.pendingAmount}</p>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>जतन झाले</DialogTitle>
        <DialogContent>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <Typography>तुम्हाला पुढे काय करायचे आहे?</Typography>
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <IconButton
                  color="primary"
                  onClick={handleWhatsApp}
                  title="Send WhatsApp Message"
                >
                  <WhatsAppIcon />
                </IconButton>
                {selectedItem && (
                  <IconButton
                    
                    onClick={() => sharePdf(selectedItem)}
                    title="Share PDF"
                  >
                    <PictureAsPdfIcon />
                  </IconButton>
                )}
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewData;
