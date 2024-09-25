import React, { useState } from 'react';
import { Button, Chip, Container, Divider, Grid, IconButton, InputBase, Paper, Typography, withStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AutocompleteInputChangeReason } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import AutoCompleteWithChip, { AutoCompleteWithChipOption } from '../../../../components/autoComplete/AutoCompleteWithChip';
import Chips, { ChipOption } from '../../../../components/chips/Chips';
import { UserServiceLocation } from '../../../../redux/dtos/UserServiceLocation';
import { SelfData } from '../../../../redux/opdDtos/SelfData';
import { getDoctorFromPostalCode, searchSymptoms } from '../../../../services/api/DoctorAPI';
import { getDefaultSnack } from '../../../../utils/SnackbarHelper';
import useStyles from './UpdateSelectComplaintStyles';

const CustomChip = withStyles({
  root: {
    borderColor: '#A8A8A8',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '16px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ECF4F4',
    },
  },
  clickable: {
    '&:focus': {
      backgroundColor: '#ECF4F4',
    },
  },
  label: {
    fontSize: '12px',
  },
})(Chip);
const UpdateSelectComplaint = () => {
  const classes = useStyles();
  const history = useHistory();
  const { successSnack, failSnack, warningSnack } = getDefaultSnack(useSnackbar().enqueueSnackbar);
  const noteString = localStorage.getItem('complaint-note');
  const [note, setNote] = useState(noteString ? noteString : '');
  const selectedSymptomString = localStorage.getItem('selected-symptom');
  const selectedSymptom: string[] = selectedSymptomString ? JSON.parse(selectedSymptomString) : [];
  const selfDataString = localStorage.getItem('selfData');
  const selfData: SelfData | null = selfDataString ? JSON.parse(selfDataString) : null;
  const [symptoms, setSymptoms] = useState<string[]>(selectedSymptom);

  const handleBackClick = () => {
    const symptomCount = symptoms.length;
    if (symptomCount === 0) {
      failSnack('Please select at least one complaint or symptom');
      return;
    }
    history.goBack();
  };

  React.useEffect(() => {
    if (symptoms) {
      localStorage.setItem('selected-symptom', JSON.stringify(symptoms));
    }
  }, [symptoms]);

  const goToSelectSlot = () => {
    const symptomCount = symptoms.length;
    if (symptomCount === 0) {
      failSnack('Please select at least one complaint or symptom');
      return;
    }
    history.goBack();
  };
  const onAutoCompleteSelectionValueChange = (event: React.ChangeEvent<{}>, value: AutoCompleteWithChipOption | null) => {
    if (value) {
      addSymptom(value.title);
    }
  };
  const onInputChange = (event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason !== 'input') {
      return;
    }

  };
  const searchData = (request: any, callback: (results?: AutoCompleteWithChipOption[]) => void) => {
    searchSymptoms(request.input)
      .then((response) => {
        const dataToReturn = response.data.map((symptom: any) => {
          return {
            title: symptom.symptomName,
            data: symptom,
          } as AutoCompleteWithChipOption;
        });

        callback(dataToReturn);
      })
      .catch((error) => { });
  };
  const getSelectedSymptoms = () => {
    return symptoms.map((s, index) => {
      return {
        title: s,
        data: s,
        variant: 'default',
        onDelete: () => {
          if (s) {
            removeSymptom(s);
          }
        },
      } as ChipOption;
    });
  };
  const addSymptom = (symptom: string | undefined) => {
    if (symptom) {
      setSymptoms((prevSymptoms) => [...prevSymptoms, symptom]);

    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms((prevSymptoms) => prevSymptoms.filter((s) => s !== symptom));
  };
  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
    localStorage.setItem('complaint-note', event.target.value);
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
                <Typography variant="h6" className={classes.title}>Complaints</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <AutoCompleteWithChip
              noOptionsText={'No data available'}
              placeHolder={'Search Complaints'}
              onChange={onAutoCompleteSelectionValueChange}
              searchData={searchData}
              onInputChange={onInputChange}
            ></AutoCompleteWithChip>
            <Chips options={getSelectedSymptoms()}></Chips>
          </Grid>
          <Grid item className={classes.noteContainer}>
            <Paper className={classes.notePaper}>
              <Typography variant="body2" style={{ color: '#000000' }}>
                Write Note to doctor
              </Typography>
              <InputBase
                value={note}
                onChange={handleNoteChange}
                multiline
                minRows={4}
                maxRows={10}
                style={{ background: '#D3D3D333', padding: '10px', borderRadius: 6, marginLeft: 1, width: '100%', height: '90px' }}
              />
            </Paper>
          </Grid>

        </Grid>
        <Button variant="contained" color="primary" onClick={goToSelectSlot} className={classes.nextButton}>Next</Button>
      </Container>
    </div>
  );
};

export default UpdateSelectComplaint;
