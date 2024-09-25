import React, { useEffect } from 'react';
import { Box, Chip, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete, AutocompleteInputChangeReason, AutocompleteRenderOptionState, createFilterOptions } from '@material-ui/lab';
import throttle from 'lodash/throttle';

import useStyles from './AutoCompleteWithChipStyles';

export interface AutoCompleteWithRowOption {
  title: string;
  data?: any;
  selected?: boolean;
  id: any;
  isNew: boolean;
}

export interface AutoCompleteWithRowProps {
  error?: boolean;
  noOptionsText?: string;
  allowAddNewOption?: boolean;
  placeHolder: string;
  onChange: (event: React.ChangeEvent<{}>, value: AutoCompleteWithRowOption | null) => void;
  onInputChange?: (event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason) => void;
  searchData?: (request: any, callback: (results?: AutoCompleteWithRowOption[]) => void, doctorId?: string) => void;
  renderOption?: (option: AutoCompleteWithRowOption, state: AutocompleteRenderOptionState) => React.ReactNode;
  doctorId?: string;
}

const filter = createFilterOptions<AutoCompleteWithRowOption>();

const AutoCompleteWithRow = (props: AutoCompleteWithRowProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<AutoCompleteWithRowOption | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<AutoCompleteWithRowOption[]>([]);

  const fetch = React.useMemo(
    () =>
      throttle((request: { input: string }, callback: (results?: AutoCompleteWithRowOption[]) => void, doctorId) => {
        if (props.searchData) {
          props.searchData(request, callback, doctorId);
        }
      }, 500),
    [],
  );

  useEffect(() => {
    if (inputValue === '') {
      // setOptions(value ? [value] : []);
      setOptions([]);
      return undefined;
    }

    fetch(
      { input: inputValue },
      (results?: AutoCompleteWithRowOption[]) => {
        let newOptions = [] as AutoCompleteWithRowOption[];

        // if (value) {
        //   newOptions = [value];
        // }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      },
      { doctorId: props.doctorId },
    );

    return () => {
      // active = false;
    };
  }, [value, inputValue, fetch, props.doctorId]);

  const onOpen = (event: React.ChangeEvent<{}>) => {
    setOptions([]);
  };

  return (
    <Autocomplete
      noOptionsText={props.noOptionsText}
      className={classes.root}
      id="google-map-demo"
      fullWidth
      size="small"
      blurOnSelect={true}
      onOpen={onOpen}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={null}
      classes={{
        option: classes.option,
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          if (props.allowAddNewOption && filtered.length === 0) {
            filtered.push({
              id: 'NEW',
              data: params.inputValue,
              title: `Add "${params.inputValue}"`,
              isNew: true,
            });
          }
        }

        return filtered;
      }}
      // ListboxComponent={(listboxProps : any) => (
      //   <ListboxComponent {...listboxProps} />
      // )}
      onChange={(event: any, newValue: AutoCompleteWithRowOption | null, reason) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        if (props.onChange) {
          props.onChange(event, newValue);
        }
      }}
      onInputChange={(event, newInputValue, reason: any) => {
        setInputValue(newInputValue);
        if (props.onInputChange) {
          props.onInputChange(event, newInputValue, reason);
        }
      }}
      renderInput={(params) => (
        <TextField className={classes.textField} error={props.error} {...params} label={props.placeHolder} variant="outlined" fullWidth />
      )}
      renderOption={(option, state) => {
        if (props.renderOption) {
          return props.renderOption(option, state);
        }

        return (
          <Box display="flex" width="100%">
            <Box width="50px" height="50px">
              Icon
            </Box>
            <Box flex="1">
              <Typography>{option.title}</Typography>
              <Typography>subttle</Typography>
            </Box>
            <Box width="100px" height="50px">
              Powerd by icon
            </Box>
          </Box>
        );
      }}
    />
  );
};

export default AutoCompleteWithRow;
