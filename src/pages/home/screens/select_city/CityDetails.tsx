import React, { useState } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSnackbar } from 'notistack';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { useHistory, useParams } from 'react-router-dom';

import ic_delete from '../../../../assets/Icons/ic_delete.svg';
import ic_edit from '../../../../assets/Icons/ic_edit.svg';
import ic_location_check from '../../../../assets/Icons/ic_location_check.svg';
import ic_not_found from '../../../../assets/Icons/ic_not_found.png';
import ic_select_current_location from '../../../../assets/Icons/ic_select_current_location.svg';
import { UserServiceLocation } from '../../../../redux/dtos/UserServiceLocation';
import { SelfData } from '../../../../redux/opdDtos/SelfData';
import { addRecentLocation, getAllAddress } from '../../../../services/api/DoctorAPI';
import { getDefaultSnack } from '../../../../utils/SnackbarHelper';
import useStyles from './CityDetailsStyles';

const GEOCODE_API_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const PLACE_API_KEY = 'AIzaSyAOiiyEbrK91jrQQ3t64ANOdTHYvcb-AxI';

// Define the central location for Pune (latitude, longitude) and radius (in meters)
const PUNE_LOCATION = new google.maps.LatLng(18.5204, 73.8567); // Central coordinates for Pune
const RADIUS = 10000; // Radius in meters (10 km)

const CityDetails = () => {
  const classes = useStyles();
  const history = useHistory();
  const { successSnack, failSnack, warningSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
  const city = localStorage.getItem('selected_city');
  const [inputFocused, setInputFocused] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const selfDataString = localStorage.getItem('selfData');
  const selfData: SelfData | null = selfDataString ? JSON.parse(selfDataString) : null;
  const [addresses, setAddresses] = useState<UserServiceLocation[]>([]);
  const [isAvailableDiloage, setIsAvailableDiloage] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  React.useEffect(() => {
    if (selfData != null) {
      getAllAddress(selfData?.userId)
        .then((response) => {
          setAddresses(response.data);
        })
        .catch(error => {
          console.error('Error fetching clinics:', error);
        });
    }
  }, []);

  const handleBackClick = () => {
    history.goBack();
  };

  const handleSetCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Current Coordinates:', { latitude, longitude });

          // Fetch location details using the coordinates
          fetch(`${GEOCODE_API_BASE_URL}latlng=${latitude},${longitude}&key=${PLACE_API_KEY}`)
            .then(response => response.json())
            .then(data => {
              if (data.results.length > 0) {
                const address = data.results[0].formatted_address;
                const addressComponents = data.results[0].address_components.reduce((acc: any, component: any) => {
                  const { types, long_name } = component;
                  if (types.includes('locality')) acc.city = long_name;
                  if (types.includes('administrative_area_level_1')) acc.state = long_name;
                  if (types.includes('postal_code')) acc.pincode = long_name;
                  if (types.includes('country')) acc.country = long_name;
                  if (types.includes('neighborhood')) acc.nearBy = long_name;
                  return acc;
                }, {});

                console.log('Detailed Location Info:', {
                  address,
                  nearBy: addressComponents.nearBy || '',
                  pincode: addressComponents.pincode || '',
                  city: addressComponents.city || '',
                  state: addressComponents.state || '',
                  country: addressComponents.country || '',
                });
                const paylod = {
                  displayAddress: address,
                  parentPatientId: selfData?.userId,
                  postalCode: addressComponents.pincode,
                  type: addressComponents.city
                }
                setIsAvailableDiloage(true);
                addRecentLocation(paylod)
                  .then((response) => {
                    setIsAvailableDiloage(false);
                    history.push('/home');
                  })
                  .catch(function (error) {
                    if (error.response) {
                      setIsAvailable(false);
                      if (error.response && error.response.status === 404) {
                        failSnack(' we are unable to provide service in this zone at the moment.');
                      }
                    } else if (error.request) {
                    } else {
                    }
                  });
              } else {
                failSnack('No location data found');
              }
            })
            .catch(error => {
              failSnack('Error fetching location details: ', error);
            });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              failSnack('Location permission denied. Please enable location access in your browser settings.');
              break;
            case error.POSITION_UNAVAILABLE:
              failSnack('Location information is unavailable. Please check your location settings.');
              break;
            case error.TIMEOUT:
              failSnack('The request to get user location timed out. Please try again.');
              break;
            default:
              failSnack('An unknown error occurred. Please try again.');
          }
          // Open the dialog with instructions
          setDialogOpen(true);
        },
        { enableHighAccuracy: true }, // Optional: For better accuracy
      );
    } else {
      failSnack('Geolocation is not supported by this browser.');
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handelAvailableDiloageClose = () => {
    setIsAvailable(true);
    setIsAvailableDiloage(false);
  };
  const handleSuggestSelect = (suggest: Suggest) => {
    if (suggest) {
      const { location } = suggest;
      fetch(`${GEOCODE_API_BASE_URL}latlng=${location.lat},${location.lng}&key=${PLACE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
          const result = data.results[0];
          const address = result.formatted_address;
          const addressComponents = result.address_components.reduce((acc: any, component: any) => {
            const { types, long_name } = component;
            if (types.includes('locality')) acc.city = long_name;
            if (types.includes('administrative_area_level_1')) acc.state = long_name;
            if (types.includes('postal_code')) acc.pincode = long_name;
            if (types.includes('country')) acc.country = long_name;
            if (types.includes('neighborhood')) acc.nearBy = long_name;
            return acc;
          }, {});
          // Log the extracted details
          console.log({
            address,
            nearBy: addressComponents.nearBy || '',
            pincode: addressComponents.pincode || '',
            city: addressComponents.city || '',
            state: addressComponents.state || '',
            country: addressComponents.country || '',
          });
          // Optionally navigate to the next page
          const paylod = {
            displayAddress: address,
            parentPatientId: selfData?.userId,
            postalCode: addressComponents.pincode,
            type: addressComponents.city
          }
          setIsAvailableDiloage(true);
          addRecentLocation(paylod)
            .then((response) => {
              setIsAvailableDiloage(false);
              history.push('/home');
            })
            .catch(function (error) {
              if (error.response) {
                setIsAvailable(false);
                if (error.response && error.response.status === 404) {
                  failSnack(' we are unable to provide service in this zone at the moment.');
                }
              } else if (error.request) {
              } else {
              }
            });
        })
        .catch(error => {
          console.error('Error fetching address details: ', error);
        });
    }
  };

  const editPatientClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    history.push('/update-family-member');
  };

  const handleSavedCardClick = (address: UserServiceLocation) => {
    const paylod = {
      displayAddress: address.address,
      parentPatientId: address.parentPatientId,
      postalCode: address.postalCode,
      type: address.type
    }
    setIsAvailableDiloage(true);
    addRecentLocation(paylod)
      .then((response) => {
        setIsAvailableDiloage(false);
        history.push('/home');
      })
      .catch(function (error) {
        if (error.response) {
          setIsAvailable(false);
          if (error.response && error.response.status === 404) {
            failSnack(' we are unable to provide service in this zone at the moment.');
          }
        } else if (error.request) {
        } else {
        }
      });
  }

  return (
    <div className={classes.centerScreen}>
      <Container className={classes.container}>
        <Grid container alignItems="center" className={classes.header}>
          <Grid item>
            <IconButton onClick={handleBackClick}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.title}>{city}</Typography>
          </Grid>
        </Grid>
        <div className={classes.searchField}>
          <Geosuggest
            placeholder="Search For Area, Pincode"
            onSuggestSelect={handleSuggestSelect}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            location={PUNE_LOCATION}
            radius={RADIUS}
            country="in"
            style={{
              input: {
                borderRadius: '8px',
                border: '1px solid #ddd',
                padding: '10px 40px 10px 10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                width: '200px',
                outline: 'none',
              },
              suggests: {
                display: 'block',
                borderRadius: '20px',
                border: inputFocused ? '1px solid #ddd' : 'none',
                marginTop: '10px',
                padding: '0',
                overflowY: 'auto',
                maxHeight: '250px',
              },
              suggestItem: {
                padding: '10px',
                textAlign: 'left',
                borderBottom: '1px solid #ddd',
                cursor: 'pointer',
                listStyleType: 'none',
              },
            }}
          />
          <img
            src={ic_select_current_location}
            onClick={handleSetCurrentLocationClick}
            style={{ width: '200px', cursor: 'pointer', marginLeft: '20px' }}
            alt="Select Current Location"
          />
        </div>
        <Typography variant="body1" className={classes.savedAddressTitle}>Saved Address</Typography>
        {addresses.map((address) => (
          <div key={address.userServiceLocationId} className={classes.patientInfo}>
            <Grid container onClick={() => handleSavedCardClick(address)} direction="column" spacing={1}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography style={{ color: '#374151', fontSize: '12px', padding: '0px', margin: 0 }}>{address.type}</Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <IconButton onClick={(event) => event.stopPropagation()}>
                        <img
                          src={ic_delete}
                          alt="delete"
                        />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={editPatientClick}>
                        <img
                          src={ic_edit}
                          alt="edit"
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '14px', padding: '0px', marginTop: 0 }} variant="h6">{address.address}</Typography>
            </Grid>
          </div>
        ))}
      </Container>

      {/* Dialog for location settings instructions */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Enable Location Services</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            To enable location services:
            <ul>
              <li>On Windows: Open Settings {'>'} Privacy {'>'} Location and ensure location access is turned on.</li>
              <li>On macOS: Open System Preferences {'>'} Security & Privacy {'>'} Privacy {'>'} Location Services and enable location access for your browser.</li>
            </ul>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isAvailableDiloage}>
        <DialogTitle>Enable Location Services</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px', textAlign: 'center' }}>
            {!isAvailable ? (
              <>
                <img src={ic_not_found} alt="Doctor Icon" style={{ width: '150px', marginBottom: '20px' }} />
                <Typography variant="h5">We’re Not Here Yet!</Typography>
                <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '20px' }}>
                  Stay tuned for updates on when we’ll be available in your area!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.nextButton}
                  onClick={handelAvailableDiloageClose}
                >
                  Change Location
                </Button>
              </>
            ) : (
              <>
                <img src={ic_location_check} alt="Doctor Icon" style={{ width: '150px', marginBottom: '10px' }} />
                <Typography variant="body1" style={{ color: '#26A9B1', marginBottom: '20px' }}>
                  Loading Your Location
                </Typography>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CityDetails;
