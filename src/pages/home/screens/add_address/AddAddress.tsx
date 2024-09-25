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
    const [pincode, setPincode] = useState('411001');
    const [addressType, setAddressType] = useState('Home');
    const [localityOptions, setLocalityOptions] = useState<string[]>([]);
    const [selectedLocality, setSelectedLocality] = useState('');
    const [formattedAddress, setFormattedAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const selfDataString = localStorage.getItem('selfData');
    const selfData: SelfData | null = selfDataString ? JSON.parse(selfDataString) : null;

    useEffect(() => {
        if (pincode.length === 6) {
            fetch(`${GEOCODE_API_BASE_URL}address=${pincode}&key=${PLACE_API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    const localities = data.results[0];
                    setFormattedAddress(localities.formatted_address);
                    setLocalityOptions(localities.postcode_localities || []);
                    setState(localities.address_components[4]?.long_name || '');
                    setCity(localities.address_components[1]?.long_name || '');
                })
                .catch((error) => {
                    console.error('Error fetching address details: ', error);
                });
        }
    }, [pincode]);

    const handleBackClick = () => {
        history.goBack();
    };

    const handleSaveClick = () => {
        if (!address) {
            warningSnack("Please enter address");
            return;
        }
        const payload = {
            address: address,
            city: 'Pune',
            country: 'India',
            landmark: landmark,
            locality: 'Koregaon Park',
            parentPatientId: selfData?.userId,
            postalCode: '411001',
            state: 'Maharashtra',
            type: addressType,
        };
        addAddress(payload)
            .then((response) => {
                history.goBack();
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    failSnack('We are unable to provide service in this zone at the moment.');
                }
            });
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
                        <Typography variant="h6" className={classes.title}>Add New Address</Typography>
                    </Grid>
                </Grid>
                <Typography variant="h6" className={classes.headerText}>Enter your address inside koregaon park</Typography>
                <form className={classes.form}>
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
                        Save
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default AddAddress;
