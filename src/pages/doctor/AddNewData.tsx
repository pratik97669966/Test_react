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
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import ic_callender from '../../assets/Icons/ic_callender.svg';
import logo from '../../assets/Icons/logo.png';
import { getDefaultSnack } from '../../utils/SnackbarHelper';
import { BillData } from './AllData';
import { generateInvoicePDF } from './invoiceUtils';

// ---------- Styles ----------
const useLoaderStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const useStyles = makeStyles((theme) => ({
  centerScreen: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f2f2f2',
    padding: theme.spacing(2),
  },
  container: {
    width: '100%',
    maxWidth: 700, // card max width वाढवले
    padding: theme.spacing(2),
  },
  card: {
    background: '#fff',
    padding: 25,
    borderRadius: 12,
    boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
    width: '100%', // full width of container
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  textField: {
    marginTop: 8,
    marginBottom: 8,
  },
  logo: {
    width: 140,
    marginBottom: 15,
    alignSelf: 'center',
  },
  toggleButtonGroup: {
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  iconAddMember: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: '14px',
  },
}));


// ---------- Component ----------
const AddNewData = () => {
  const history = useHistory();
  const { successSnack, failSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
  const classes = useStyles();
  const loaderClasses = useLoaderStyles();

  // -------- Form State --------
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [dob, setDob] = useState<Date | null>(new Date());
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [deliveryCharges, setDeliveryCharges] = useState('');
  const [discount, setDiscount] = useState('0');
  const [address, setAddress] = useState('');
  const [branch, setBranch] = useState('Jakhuri');
  const [fromWho, setFromWho] = useState('Pradeep');
  const [comboPack, setComboPack] = useState('Single');
  const [quantity, setQuantity] = useState(1);
  const [comboPrice, setComboPrice] = useState(3100);
  const [price, setPrice] = useState(3100);
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
      case 'Double': basePrice = 6100; break;
      case 'Triple': basePrice = 9100; break;
    }
    setComboPrice(basePrice);

    const discountAmount = parseFloat(discount || '0');
    const deliveryChargeAmount = parseFloat(deliveryCharges || '0');
    const totalAmount = basePrice * quantity - discountAmount + deliveryChargeAmount;

    setPrice(totalAmount);
  }, [comboPack, discount, deliveryCharges, quantity]);

  const pendingAmount = price - (parseFloat(paidAmount) || 0);

  const onMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(value);
  };

  const handleDateChange = (date: Date | null) => setDob(date);
  const handleDeliveryDate = (date: Date | null) => setDeliveryDate(date);
  const openAllDataList = () => history.push('/all-data');

  // -------- PDF & WhatsApp --------
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
    if (!blob) return failSnack('Failed to prepare invoice');
    const file = new File([blob], `Invoice_${item.id}.pdf`, { type: 'application/pdf' });

    try {
      if ((navigator as any).canShare && (navigator as any).canShare({ files: [file] })) {
        await (navigator as any).share({ files: [file] });
      } else {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      }
    } catch (err) {
      console.error('Share fallback', err);
      failSnack('Share failed');
    }
  }, [createPdfBlob, failSnack]);

  const handleWhatsApp = useCallback(() => {
    if (!selectedItem) return;
    const item = selectedItem;

    // Ensure numeric values are correctly handled
    const comboPrice = Number(item.comboPrice || 0);
    const discountAmount = Number(item.discount || 0);
    const deliveryChargesAmount = Number(item.deliveryCharges || 0);
    const totalPrice = Number(item.price || 0);
    const paidAmount = Number(item.paidAmount || 0);
    const pendingAmount = Number(item.pendingAmount || 0);

    // Optional: format dates
    const formattedDateOfBirth = item.dateOfBirth ? new Date(item.dateOfBirth).toLocaleDateString('en-GB') : '';
    const formattedDeliveryDate = item.deliveryDate ? new Date(item.deliveryDate).toLocaleDateString('en-GB') : '';

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
किंमत: ${comboPrice.toFixed(2)}/- रुपये
${discountAmount > 0 ? 'सवलत: ' + discountAmount.toFixed(2) + '/- रुपये' : ''}
${deliveryChargesAmount > 0 ? 'डिलिव्हरी चार्जेस: ' + deliveryChargesAmount.toFixed(2) + '/- रुपये' : ''} 

*एकूण रक्कम: ${totalPrice.toFixed(2)}/- रुपये*

जमा रक्कम: ${paidAmount.toFixed(2)}/- रुपये

*शिल्लक रक्कम: ${pendingAmount.toFixed(2)}/- रुपये*

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


  }, [selectedItem]);

  // -------- Save --------
  const handleSave = async () => {
    if (mobileNumber.length !== 10) return failSnack('Enter 10 digit mobile number');

    const payload = {
      phone: mobileNumber,
      firstName,
      dateOfBirth: dob,
      address,
      branch,
      comboPack,
      qty: quantity,
      comboPrice,
      price,
      fromWho,
      discount,
      paidAmount: parseFloat(paidAmount),
      pendingAmount,
      paymentMode,
      note,
      deliveryCharges: parseFloat(deliveryCharges || '0'),
      deliveryDate,
      status: pendingAmount <= 0 ? 'Paid' : '',
    };

    setLoading(true);
    try {
      const response = await axios.post('https://gunjalpatilserver.onrender.com/data', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        setSelectedItem(response.data);
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
      } else failSnack('Failed to add data');
    } catch (error) {
      console.error(error);
      failSnack('An unexpected error occurred');
    }
    setLoading(false);
  };

  return (
    <div className={classes.centerScreen}>
      <Backdrop className={loaderClasses.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container className={classes.container}>
        <Grid container justifyContent="center">
          <Grid item>
            <div className={classes.card}>
              <img src={logo} alt="Logo" className={classes.logo} />
              <Typography variant="h5" gutterBottom>Registration</Typography>

              {/* --- Inputs --- */}
              <TextField className={classes.textField} label="Mobile Number" variant="outlined" value={mobileNumber} onChange={onMobileNumberChange} inputProps={{ maxLength: 10 }} fullWidth />
              <TextField className={classes.textField} label="Customer Name" variant="outlined" value={firstName} onChange={e => setFirstName(e.target.value)} fullWidth />
              <TextField className={classes.textField} label="Address" variant="outlined" value={address} onChange={e => setAddress(e.target.value)} fullWidth />

              <InputLabel>Generated By</InputLabel>
              <Select className={classes.textField} value={fromWho} onChange={e => setFromWho(e.target.value as string)} variant="outlined" fullWidth>
                <MenuItem value="Pradeep">Pradeep</MenuItem>
                <MenuItem value="Amol">Amol</MenuItem>
                <MenuItem value="Pratiksha">Pratiksha</MenuItem>
                <MenuItem value="Anna">Anna</MenuItem>
              </Select>

              <InputLabel>Branch</InputLabel>
              <Select className={classes.textField} value={branch} onChange={e => setBranch(e.target.value as string)} variant="outlined" fullWidth>
                <MenuItem value="Jakhuri">Jakhuri</MenuItem>
                <MenuItem value="Ashwi">Ashwi</MenuItem>
                <MenuItem value="Couriour">Couriour</MenuItem>
                <MenuItem value="OtherTransport">Other Transport</MenuItem>
              </Select>

              <ToggleButtonGroup className={classes.toggleButtonGroup} value={comboPack} exclusive onChange={(e, val) => val && setComboPack(val)}>
                <ToggleButton value="Single">Single</ToggleButton>
                <ToggleButton value="Double">Double</ToggleButton>
                <ToggleButton value="Triple">Triple</ToggleButton>
              </ToggleButtonGroup>

              <InputLabel>Quantity</InputLabel>
              <Select className={classes.textField} value={quantity} onChange={e => setQuantity(parseInt(e.target.value as string, 10))} variant="outlined" fullWidth>
                {numbers.map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
              </Select>

              {/* --- Price Sequence --- */}
              <TextField className={classes.textField} label="Combo Amount" variant="outlined" value={comboPrice} InputProps={{ readOnly: true }} fullWidth />
              <TextField className={classes.textField} label="Discount" variant="outlined" value={discount} onChange={e => setDiscount(e.target.value)} fullWidth />
              <TextField className={classes.textField} label="Delivery Charges" variant="outlined" value={deliveryCharges} onChange={e => setDeliveryCharges(e.target.value)} fullWidth />
              <TextField className={classes.textField} label="Total Amount" variant="outlined" value={price} InputProps={{ readOnly: true }} fullWidth />
              <TextField className={classes.textField} label="Advance Payment" variant="outlined" value={paidAmount} onChange={e => setPaidAmount(e.target.value)} fullWidth />
              <TextField className={classes.textField} label="Pending Amount" variant="outlined" value={pendingAmount} InputProps={{ readOnly: true }} fullWidth />

              <InputLabel>Payment Mode</InputLabel>
              <Select className={classes.textField} value={paymentMode} onChange={e => setPaymentMode(e.target.value as string)} variant="outlined" fullWidth>
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
              </Select>

              <DatePicker value={dob} onChange={handleDateChange} format="dd-MM-yyyy"
                TextFieldComponent={(props: JSX.IntrinsicAttributes & TextFieldProps) => (
                  <TextField {...props} fullWidth className={classes.textField} variant="outlined" label="Booking Date"
                    InputProps={{
                      ...props.InputProps,
                      startAdornment: <InputAdornment position="start"><img src={ic_callender} alt="calendar" className={classes.iconAddMember} /></InputAdornment>,
                    }}
                  />
                )}
              />

              <DatePicker value={deliveryDate} onChange={handleDeliveryDate} format="dd-MM-yyyy"
                TextFieldComponent={(props: JSX.IntrinsicAttributes & TextFieldProps) => (
                  <TextField {...props} fullWidth className={classes.textField} variant="outlined" label="Delivery Date"
                    InputProps={{
                      ...props.InputProps,
                      startAdornment: <InputAdornment position="start"><img src={ic_callender} alt="calendar" className={classes.iconAddMember} /></InputAdornment>,
                    }}
                  />
                )}
              />

              <TextField className={classes.textField} label="Note" variant="outlined" value={note} onChange={e => setNote(e.target.value)} fullWidth />

              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="primary" onClick={handleSave} disabled={!firstName || !mobileNumber || !dob || !address || !branch || !comboPack || !paidAmount}>Save</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="secondary" onClick={openAllDataList}>View All Data</Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>जतन झाले</DialogTitle>
        <DialogContent>
          {loading ? <CircularProgress /> : (
            <>
              <Typography>तुम्हाला पुढे काय करायचे आहे?</Typography>
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <IconButton color="primary" onClick={handleWhatsApp} title="Send WhatsApp Message">
                  <WhatsAppIcon />
                </IconButton>
                {selectedItem && (
                  <IconButton onClick={() => sharePdf(selectedItem)} title="Share PDF">
                    <PictureAsPdfIcon />
                  </IconButton>
                )}
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewData;
