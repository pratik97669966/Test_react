import React, { useState } from 'react';
import { Button, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RemoveIcon from '@material-ui/icons/Remove';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import { getAllProducts } from '../../../../services/api/DoctorAPI';
import { getDefaultSnack } from '../../../../utils/SnackbarHelper';
import useStyles from './BIllingPageStyles';

export interface Product {
  productName: string;
  price: number;
  quantity: number;
  minQuantity: number;
}

const AddAddress = () => {
  const classes = useStyles();
  const history = useHistory();
  const [products, setProducts] = useState<Product[]>([]);

  const { successSnack, failSnack, warningSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
  React.useEffect(() => {
    const combopack = localStorage.getItem('combopack');
    getAllProducts(combopack)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
      });
  }, []);
  // State to store products

  const handleBackClick = () => {
    history.goBack();
  };

  const calculateTotal = () => {
    return products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  };

  const handleQtyChange = (index: number, delta: number) => {
    setProducts(products.map((product, i) => {
      if (i === index) {
        // Calculate the new quantity
        const newQty = product.quantity + delta;

        // Ensure the new quantity is not less than minQuantity and is at least 1
        const updatedQty = Math.max(newQty, product.minQuantity);

        return { ...product, quantity: updatedQty }; // Ensure to use 'quantity' for the updated key
      }
      return product;
    }));
  };

  const handleSave = () => {
    console.log('Billing Details:', products);
    console.log('Total:', calculateTotal());
    const amt = calculateTotal();
    localStorage.setItem('total', amt + '');

    history.push('/add-address');
  };

  return (
    <div className={classes.centerScreen}>
      <Container className={classes.container}>
        <Grid container alignItems="center" style={{ marginBottom: '10px' }}>
          <Grid item>
            <IconButton onClick={handleBackClick}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.title}>Billing</Typography>
          </Grid>
        </Grid>
        <div className={classes.mainCard} >
          {products.map((product, index) => (
            <div className={classes.patientInfo} key={index}>
              <Typography variant="h6" style={{ fontSize: '12px', fontStyle: 'bold' }}>{product.productName}</Typography>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="h6" style={{ fontSize: '12px' }}>{`Price:${product.price}`}</Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => handleQtyChange(index, -1)}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h6" style={{ fontSize: '12px' }}>{product.quantity}</Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => handleQtyChange(index, 1)}>
                    <AddIcon />
                  </IconButton>
                </Grid>
                <Grid item xs />
                <Grid item>
                  <Typography variant="h6" style={{ fontSize: '12px' }}>{'Total:' + product.price * product.quantity}</Typography>
                </Grid>
              </Grid>
            </div>
          ))}
        </div>
        {/* Total */}
        <Grid container spacing={2} alignItems="center" style={{ marginTop: '20px' }}>
          <Grid item xs={6}>
            <Typography variant="h6">Total</Typography>
          </Grid>
          <Grid item xs={6} >
            <Typography style={{ justifyItems: 'center' }} variant="h6">{calculateTotal()}</Typography>
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" onClick={handleSave} className={classes.nextButton}>
          Next
        </Button>
      </Container>
    </div>
  );
};

export default AddAddress;
