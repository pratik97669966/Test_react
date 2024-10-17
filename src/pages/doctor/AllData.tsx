import React, { useEffect, useState } from 'react';
import {
  Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography,
} from '@material-ui/core';
import { WhatsApp } from '@material-ui/icons';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import useStyles from './AllDataStyles';

export interface BillData {
  id: number;
  address: string;
  branch: string;
  comboPack: string;
  dateOfBirth: string;
  firstName: string;
  note: string;
  paidAmount: number;
  paymentMode: string;
  pendingAmount: number;
  phone: string;
  price: number;
  comboPrice: number;
  qty: number;
  status: string;
  deliveryDate: string;
  deliveryStatus: string;
  deliveryCharges: string;
}

const AllData = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<BillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://gunjalpatilserver.onrender.com/data');
        setData(response.data);
        enqueueSnackbar('Data fetched successfully', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [enqueueSnackbar]);

  const filteredData = data.filter((item) => {
    const { phone, firstName, id } = item;
    const normalizedPhone = String(phone);
    return (
      normalizedPhone.includes(searchTerm) ||
      firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(id).includes(searchTerm)
    );
  });

  const handleWhatsAppClick = async (item: BillData) => {
    if (item.phone) {
      const formattedDateOfBirth = item.dateOfBirth ? new Date(item.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "";
      const formattedDeliveryDate = item.deliveryDate ? new Date(item.deliveryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "";

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
    
  ${formattedDateOfBirth ? "तारीख: " + formattedDateOfBirth : ""}
  बिल क्रमांक: ${item.id}
  *ग्राहकाचे नाव: ${item.firstName}*
  संपर्क क्रमांक: ${item.phone}
    
  ऑर्डर तपशील:
    
  ${item.comboPack} Combo Pack
  नग: ${item.qty}
  किंमत: ${item.comboPrice}/- रुपये
  ${parseFloat(item.deliveryCharges) > 0 ? "डिलिव्हरी चार्जेस: " + item.deliveryCharges + "/- रुपये" : ""} 
    
  *एकूण रक्कम: ${item.price}/- रुपये*
    
  जमा रक्कम: ${item.paidAmount}/- रुपये
  
  *शिल्लक रक्कम: ${item.pendingAmount}/- रुपये*
    
  अभिनंदन ${item.firstName} आपल्या दिवाळीच्या फराळाची बुकिंग झालेली आहे.
  ${formattedDeliveryDate ? "आपला कोम्बो पॅक घेण्याची अंदाजे तारीख: " + formattedDeliveryDate : ""}
  
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
    <div>
      <Container className={classes.container}>
        <Typography variant="h4" gutterBottom>
          All Data
        </Typography>
        <TextField
          className={classes.searchField}
          label="Search by Name, Mobile Number, or ID"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        />
        {loading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.comboPack}</TableCell>
                    <TableCell>{item.comboPrice}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>{item.deliveryCharges}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.paidAmount}</TableCell>
                    <TableCell>{item.pendingAmount}</TableCell>
                    <TableCell>{item.paymentMode}</TableCell>
                    <TableCell>{item.branch}</TableCell>
                    <TableCell>{item.note}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.deliveryDate ? new Date(item.deliveryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}</TableCell>
                    <TableCell>{item.deliveryStatus}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        startIcon={<WhatsApp />}
                        onClick={() => handleWhatsAppClick(item)}
                        style={{ marginLeft: '10px' }}
                      >
                        Send via WhatsApp
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
};

export default AllData;
