import React, { useEffect, useState } from 'react';
import { Avatar, Container, Grid, IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import ic_delete from '../../../../assets/Icons/ic_delete.svg';
import ic_edit from '../../../../assets/Icons/ic_edit.svg';
import ic_not_found from '../../../../assets/Icons/ic_not_found.png';
import { UserServiceLocation } from '../../../../redux/dtos/UserServiceLocation';
import { SelfData } from '../../../../redux/opdDtos/SelfData';
import { deleteAddress, getAllAddress } from '../../../../services/api/DoctorAPI';
import { getDefaultSnack } from '../../../../utils/SnackbarHelper';
import { useConfirmationDialog } from '../../../../utils/useConfirmationDialog';
import ConfirmationDialog from '../../diloage/ConfirmationDialog';
import useStyles from './UpdateChooseAddressStyles';

const UpdateChooseAddress = () => {
  const classes = useStyles();
  const history = useHistory();
  const { successSnack, failSnack, warningSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
  const { dialogOpen, dialogProps, showDialog, handleConfirm, handleCancel } = useConfirmationDialog();
  const selfDataString = localStorage.getItem('selfData');
  const selfData: SelfData | null = selfDataString ? JSON.parse(selfDataString) : null;
  const [addresses, setAddresses] = useState<UserServiceLocation[]>([]);

  useEffect(() => {
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

  const handleCardClick = (address: UserServiceLocation) => {
    localStorage.setItem('selected-address', JSON.stringify(address));
    history.goBack();
  };

  const editPatientClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    history.push('/update-family-member');
  };

  const handleAddAddressClick = () => {
    history.push('/add-address');
  };

  const handleDeleteClick = (event: React.MouseEvent, selectedAddress: UserServiceLocation) => {
    event.stopPropagation(); // Prevent the card click event from firing
    showDialog(
      'Delete address',
      'Are you sure you want to delete this address?',
      () => {
        deleteAddress(selectedAddress.userServiceLocationId)
          .then(() => {
            successSnack('Address deleted successfully');
            setAddresses((prevAddresses) => prevAddresses.filter(item => item.userServiceLocationId !== selectedAddress.userServiceLocationId));
          })
          .catch(error => {
            failSnack('Failed to delete address');
          });
      },
    );
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
            <Typography variant="h6" className={classes.title}>Choose Address</Typography>
          </Grid>
        </Grid>
        <div className={classes.card} onClick={handleAddAddressClick}>
          <div className={classes.cardContent}>
            <Avatar className={classes.avatar}>
              <AddIcon />
            </Avatar>
            <Typography className={classes.addText}>
              Add New Address
            </Typography>
          </div>
        </div>
        <div>
          {addresses.length > 0 ? (
            <>
              {addresses.map((address) => (
                <div key={address.userServiceLocationId} className={classes.patientInfo}>
                  <Grid container onClick={() => handleCardClick(address)} direction="column">
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography style={{ color: '#374151', fontSize: '14px', padding: '0px', margin: 0 }}>{address.type}</Typography>
                      </Grid>
                      <Grid item>
                        <Grid container>
                          <Grid item>
                            <IconButton onClick={(event) => handleDeleteClick(event, address)}>
                              <img
                                src={ic_delete}
                                alt="delete"
                              />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton>
                              <img
                                src={ic_edit}
                                alt="edit"
                              />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Typography style={{ textAlign: 'start', color: '#000000', fontStyle: 'bold', fontSize: '12px', padding: '0px', marginTop: 0 }} variant="h6">{`${address.address},${address.locality},${address.postalCode},${address.city},${address.state},${address.country}`}</Typography>
                  </Grid>
                </div>
              ))}
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px', textAlign: 'center' }}>
              <img src={ic_not_found} alt="Doctor Icon" style={{ width: '150px', marginBottom: '20px' }} />
              <Typography variant="h5">No Saved Address!</Typography>
              <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '20px' }}>
                Take First Step To Add New Address!
              </Typography>
            </div>
          )}
        </div>
      </Container>
      {
        dialogProps && (
          <ConfirmationDialog
            open={dialogOpen}
            title={dialogProps.title}
            description={dialogProps.description}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )
      }
    </div>
  );
};

export default UpdateChooseAddress;
