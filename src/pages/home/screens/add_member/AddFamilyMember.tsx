import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, IconButton, InputAdornment, MenuItem, TextField, TextFieldProps, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DatePicker } from '@material-ui/pickers';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import ic_callender from '../../../../assets/Icons/ic_callender.svg';
import { RelationInfo } from '../../../../redux/dtos/PatientData';
import { SelfData } from '../../../../redux/opdDtos/SelfData';
import { addFamilyMember, getRelations } from '../../../../services/api/DoctorAPI';
import { getDefaultSnack } from '../../../../utils/SnackbarHelper';
import useStyles from './AddFamilyMemberStyles';

const genders = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Transgender', label: 'Transgender' },
];

const AddFamilyMember = () => {
  const classes = useStyles();
  const history = useHistory();
  const [relation, setRelation] = useState('');
  const { successSnack, failSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
  const [dob, setDob] = useState<Date | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [relationMaster, setRelationsMaster] = useState<RelationInfo[]>([]);
  const selfDataString = localStorage.getItem('selfData');
  const selfData: SelfData | null = selfDataString ? JSON.parse(selfDataString) : null;

  useEffect(() => {
    getRelations()
      .then(response => {
        setRelationsMaster(response.data);
      })
      .catch(error => {
        // Handle error
      });
  }, []);

  const handleBackClick = () => {
    history.goBack();
  };

  const handleDateChange = (date: Date | null) => {
    setDob(date);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (!regex.test(e.currentTarget.value)) {
      return;
    }
    setFirstName(formatName(e.target.value));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (!regex.test(e.currentTarget.value)) {
      return;
    }
    setLastName(formatName(e.target.value));
  };

  const handleMobileNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(event.currentTarget.value)) {
      return;
    }
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const handleSave = () => {
    if (firstName === '') {
      failSnack('First name cannot be empty');
      return;
    }
    if (relation === '') {
      failSnack('Relation cannot be empty');
      return;
    }
    if (selfData) {
      const payload = {
        firstName: firstName.toString(),
        lastName: lastName.toString(),
        relationInfo: {
          relationId: relation,
          relationName: relation,
        },
        dateOfBirth: dob ? format(dob, 'yyyy-MM-dd') : '',
        mobileNumber: mobileNumber.length === 10 ? mobileNumber : selfData?.mobileNumber,
        gender: gender,
      };

      addFamilyMember(selfData?.userId, payload)
        .then(response => {
          successSnack('Family member added successfully');
          history.goBack();
        })
        .catch(error => {
          // Handle error
        });
    }
  };

  return (
    <div className={classes.centerScreen}>
      <Container className={classes.container}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container alignItems="center" style={{ marginBottom: '10px' }}>
              <Grid item>
                <IconButton onClick={handleBackClick}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h6" className={classes.title}>Add Family Member</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              label="First Name"
              name="firstName"
              value={firstName}
              className={classes.field}
              onChange={handleFirstNameChange}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Last Name"
              name="lastName"
              value={lastName}
              className={classes.field}
              onChange={handleLastNameChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Mobile Number"
              name="mobileNumber"
              value={mobileNumber}
              className={classes.field}
              onChange={handleMobileNumberChange}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>
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
                  className={classes.field}
                  variant="outlined"
                  label="Date of Birth"
                  placeholder="Select Date of Birth"
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
          <Grid item>
            <TextField
              label="Select Relation"
              name="relation"
              value={relation}
              className={classes.field}
              onChange={(e) => setRelation(e.target.value)}
              fullWidth
              required
              variant="outlined"
              select
            >
              {relationMaster.map((option) => (
                <MenuItem key={option.relationName} value={option.relationName}>
                  {option.relationName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              label="Select Gender"
              name="gender"
              value={gender}
              className={classes.field}
              onChange={(e) => setGender(e.target.value)}
              fullWidth
              required
              variant="outlined"
              select
            >
              {genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSave} className={classes.saveButton}>Add Member</Button>
      </Container>
    </div>
  );
};

export default AddFamilyMember;
