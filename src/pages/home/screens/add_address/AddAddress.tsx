import React, { useEffect, useState } from 'react';
import { Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import { SelfData } from '../../../../redux/opdDtos/SelfData';
import { addAddress } from '../../../../services/api/DoctorAPI';
import { getDefaultSnack } from '../../../../utils/SnackbarHelper';
import useStyles from './AddAddressStyles';

const GEOCODE_API_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const PLACE_API_KEY = 'AIzaSyAOiiyEbrK91jrQQ3t64ANOdTHYvcb-AxI';

const AddAddress = () => {
    const classes = useStyles();
    const history = useHistory();
    const { successSnack, failSnack, warningSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
    const [pincode, setPincode] = useState('422605');
    const [addressType, setAddressType] = useState('Home');
    const [localityOptions, setLocalityOptions] = useState<string[]>([]);
    const [selectedLocality, setSelectedLocality] = useState('');
    const [formattedAddress, setFormattedAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [total, setTotal] = useState(localStorage.getItem('total'));
    const [country, setCountry] = useState('');

    // useEffect(() => {
    //     if (pincode.length === 6) {
    //         fetch(`${GEOCODE_API_BASE_URL}address=${pincode}&key=${PLACE_API_KEY}`)
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 const localities = data.results[0];
    //                 setFormattedAddress(localities.formatted_address);
    //                 setLocalityOptions(localities.postcode_localities || []);
    //                 setState(localities.address_components[4]?.long_name || '');
    //                 setCity(localities.address_components[1]?.long_name || '');
    //             })
    //             .catch((error) => {
    //                 console.error('Error fetching address details: ', error);
    //             });
    //     }
    // }, [pincode]);

    const handleBackClick = () => {
        history.goBack();
    };

    const handleSaveClick = () => {
        if (!address) {
            warningSnack("Please enter address");
            return;
        }
        if (!landmark) {
            warningSnack("Please enter landmark");
            return;
        }
        // if (!selectedLocality) {
        //     warningSnack("Please select locality");
        //     return;
        // }
        // if (!pincode) {
        //     warningSnack("Please enter postal code");
        //     return;
        // }
        // if (!state) {
        //     warningSnack("Please enter state");
        //     return;
        // }
        if (!addressType) {
            warningSnack("Please select address type");
            return;
        }

        const addressDetails = {
            address: address,
            landmark: landmark,
            type: addressType,
        };

        // Save address details
        localStorage.setItem('address', addressDetails.address);
        localStorage.setItem('country', 'India');
        localStorage.setItem('landmark', addressDetails.landmark);
        localStorage.setItem('type', addressDetails.type);

        // Optionally, show a success message
        successSnack("Address details saved successfully");
        history.push('/payment_screen');
    };


    const handleAddressTypeChange = (event: any, newType: React.SetStateAction<string>) => {
        setAddressType(newType);
    };

    const handleLocalityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedLocality(event.target.value as string);
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
                        <Typography variant="h6" className={classes.title}>Set Your Address</Typography>
                    </Grid>
                </Grid>
                {/* <Grid container alignItems="center" style={{ flexWrap: 'nowrap' }}>
                    <Grid item>
                        <TextField
                            label="Pin Code"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setPincode(e.target.value)}
                            className={classes.textField}
                            value={pincode}
                        />
                    </Grid>
                    <Grid item>
                        <Typography className={classes.locationText}>{formattedAddress}</Typography>
                    </Grid>
                </Grid> */}
                <form className={classes.form}>
                    {/* <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel id="locality-label">
                            {localityOptions.length > 0 ? 'Select Locality' : 'Enter Pincode To Select Locality*'}
                        </InputLabel>
                        <Select
                            labelId="locality-label"
                            id="locality"
                            value={selectedLocality}
                            onChange={handleLocalityChange}
                            label={localityOptions.length > 0 ? 'Select Locality' : 'Enter Pincode To Select Locality*'}
                        >
                            {localityOptions.map((locality, index) => (
                                <MenuItem key={index} value={locality}>
                                    {locality}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}
                    <TextField
                        label="Flat no.,Building,Company, Street*"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setAddress(e.target.value)}
                        className={classes.textField}
                        style={{ marginTop: '15px' }}
                    />
                    <TextField
                        label="Landmark"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setLandmark(e.target.value)}
                        className={classes.textField}
                        style={{ marginTop: '15px' }}
                    />
                    <Typography variant="h6" className={classes.headerText}>Address name & type *</Typography>

                    <ToggleButtonGroup
                        value={addressType}
                        exclusive
                        onChange={handleAddressTypeChange}
                        className={classes.toggleButtonGroup}
                    >
                        <ToggleButton value="Home" className={classes.toggleButton}>
                            Home
                        </ToggleButton>
                        <ToggleButton value="Office" className={classes.toggleButton}>
                            Office
                        </ToggleButton>
                        <ToggleButton value="Other" className={classes.toggleButton}>
                            Other
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.nextButton}
                        onClick={handleSaveClick}
                    >
                        {`Pay Rs. ${total}`}
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default AddAddress;
