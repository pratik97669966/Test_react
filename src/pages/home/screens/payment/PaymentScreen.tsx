import React from 'react';
import { Button, Container, Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import { addnewData } from '../../../../services/api/DoctorAPI';
import { getDefaultSnack } from '../../../../utils/SnackbarHelper';
import useStyles from './PaymentScreenStyles';

const PaymentScreen: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const { successSnack, failSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);

    const handleBackClick = () => {
        history.goBack();
    };

    const handleUPIPayment = async () => {
        const totalAmount = localStorage.getItem('total');
        const transactionId = `TXN${Date.now()}`;
        const upiUrl = `upi://pay?pa=pratik97669966@ybl&pn=Gunjal Patil Bhel And Misal&mc=&tid=${transactionId}&tr=${transactionId}&tn=Payment for services&am=${totalAmount}&cu=INR`;
        const payload = {
            phone: localStorage.getItem('mobileNumber'),
            firtName: localStorage.getItem('firstName'),
            lastName: localStorage.getItem('lastName'),
            dateOfBirth: localStorage.getItem('dateOfBirth'),
            address: localStorage.getItem('address'),
            landmark: localStorage.getItem('landmark'),
            comboPack: localStorage.getItem('combopack'),
            paymentStatus: 'INITIATE',
            totalAmound: totalAmount,
            paidAmount: String,
            transactionId: transactionId,
            transactionStatus: 'INITIATE',
            note: '',
        };
        addnewData(payload)
            .then(response => {
                successSnack('Open Phone Pay');
                window.location.href = upiUrl;
            })
            .catch(error => {
            });
        // Open the UPI URL

        // setTimeout(async () => {
        //   // Replace this with actual payment status verification logic
        //   const paymentSuccess = await checkPaymentStatus(transactionId);

        //   if (paymentSuccess) {
        //     successSnack('Payment successful');
        //     console.log(`Transaction ID: ${transactionId}`);
        //   } else {
        //     failSnack('Payment failed');
        //     console.log('Payment failed');
        //   }
        // }, 5000); // Adjust the timeout as needed
    };

    // Dummy function to simulate payment status check
    const checkPaymentStatus = async (transactionId: string): Promise<boolean> => {
        // Simulate an API call to check payment status
        // Replace this with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true); // Simulating a successful payment
            }, 1000);
        });
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
                        <Typography variant="h6" className={classes.title}>Payment</Typography>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUPIPayment}
                >
                    Pay ₹1
                </Button>
            </Container>
        </div>
    );
};

export default PaymentScreen;
