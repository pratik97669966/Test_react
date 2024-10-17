import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useSnackbar } from 'notistack';

import { getDefaultSnack } from '../../utils/SnackbarHelper';
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
  comboPrice: number,
  qty: number;
  status: string;
  deliveryDate: string;
  deliveryStatus: string;
  deliveryCharges:string;
}
const AllData = () => {
  const classes = useStyles();
  const { successSnack, failSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
  const [data, setData] = useState<BillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null); // State to hold the selected item for bill generation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://gunjalpatilserver.onrender.com/data');
        setData(response.data);
        successSnack('Data fetched successfully');
      } catch (error) {
        failSnack('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtering logic
  const filteredData = data.filter((item) => {
    const { phone, firstName, id } = item;
    const normalizedPhone = String(phone); // Ensure phone is a string
    return (
      normalizedPhone.includes(searchTerm) ||
      firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(id).includes(searchTerm) // Ensure id is a string for comparison
    );
  });
  const createBillPDF = (data: BillData) => {
    const doc = new jsPDF();

    // Add company logo
    doc.addImage("https://cdn.dotpe.in/longtail/store-logo/1044445/6mx9Elc5.webp", 'PNG', 10, 10, 30, 30); // Adjust position and size

    // Set title
    doc.setFontSize(20);
    doc.text('Invoice', 14, 50);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 60);

    // Add customer details
    doc.text(`Name: ${data.firstName}`, 14, 70);
    doc.text(`Phone: ${data.phone}`, 14, 80);
    doc.text(`Address: ${data.address}`, 14, 90);

    // Add table for details
    autoTable(doc, {
      head: [['Item', 'Price', 'Paid Amount', 'Status']],
      body: [
        [
          data.comboPack,
          data.price.toString(),
          data.paidAmount.toString(),
          data.status,
        ],
      ],
      startY: 100,
    });

    // Save the PDF
    doc.save(`Invoice_${data.firstName}.pdf`);
    successSnack('Bill created successfully!');
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
                    <TableCell>{item.deliveryDate}</TableCell>
                    <TableCell>{item.deliveryStatus}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => createBillPDF(item)} // Set the selected item for billing
                      >
                        Create Bill
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
