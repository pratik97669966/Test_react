import React, { useEffect } from 'react';
import { Chip } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
  Autocomplete,
  AutocompleteInputChangeReason,
  createFilterOptions,
} from '@material-ui/lab';
import throttle from 'lodash/throttle';

import useStyles from './AutoCompleteWithChipStyles';

export interface AutoCompleteWithChipOption {
  title: string;
  data?: any;
  selected?: boolean;
  id: any;
  isNew: boolean;
}

export interface AutoCompleteWithChipProps {
  error?: boolean;
  noOptionsText?: string;
  allowAddNewOption?: boolean;
  placeHolder: string;
  onChange: (
    event: React.ChangeEvent<{}>,
    value: AutoCompleteWithChipOption | null
  ) => void;
  onInputChange?: (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  searchData?: (
    request: any,
    callback: (results?: AutoCompleteWithChipOption[]) => void
  ) => void;
  prefetchedOptions?: AutoCompleteWithChipOption[];
  showAllItemsOnOpen?: boolean;
  isDisabled?:boolean;
}

const ListboxComponent = function ListboxComponentInner({ ...rest }) {
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'white' }}
      {...rest}
    ></div>
  );
};

const filter = createFilterOptions<AutoCompleteWithChipOption>();

const AutoCompleteWithChip = (props: AutoCompleteWithChipProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<AutoCompleteWithChipOption | null>(
    null,
  );
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<AutoCompleteWithChipOption[]>(
    [],
  );

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: AutoCompleteWithChipOption[]) => void,
        ) => {
          if (props.searchData) {
            props.searchData(request, callback);
          }
        },
        200,
      ),
    [],
  );

  useEffect(() => {
    if (inputValue === '' && !props.showAllItemsOnOpen) {
      // setOptions(value ? [value] : []);
      setOptions([]);
      return undefined;
    }

    if (props.prefetchedOptions) {
      setOptions(props.prefetchedOptions);
      if (
        props.showAllItemsOnOpen &&
        (!props.prefetchedOptions || props.prefetchedOptions.length <= 0)
      ) {
        getOptions();
      } else {
        setOptions(props.prefetchedOptions);
      }
    } else {
      fetch({ input: inputValue }, (results?: AutoCompleteWithChipOption[]) => {
        let newOptions = [] as AutoCompleteWithChipOption[];
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      });
      getOptions();
    }

    return () => {
      // active = false;
    };
  }, [value, inputValue, fetch]);

  const getOptions = () => {
    fetch({ input: inputValue }, (results?: AutoCompleteWithChipOption[]) => {
      let newOptions = [] as AutoCompleteWithChipOption[];
      if (results) {
        newOptions = [...newOptions, ...results];
      }
      setOptions(newOptions);
    });
  };

  const onOpen = (event: React.ChangeEvent<{}>) => {
    setOptions([]);
    if (props.showAllItemsOnOpen) {
      setOptions(props.prefetchedOptions ? props.prefetchedOptions : []);
      //setOptions([]);
    } else {
      setOptions([]);
    }
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
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.title
      }
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={null}
      disabled={props.isDisabled}
      classes={{
        option: classes.option,
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          if (props.allowAddNewOption) {
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
      ListboxComponent={(listboxProps: any) => (
        <ListboxComponent {...listboxProps} />
      )}
      onChange={(
        event: any,
        newValue: AutoCompleteWithChipOption | null,
        reason,
      ) => {
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
        <TextField
          className={classes.textField}
          error={props.error}
          {...params}
          label={props.placeHolder}
          variant="outlined"
          fullWidth
        />
      )}
      renderOption={(option) => {
        return (
          <Chip
            variant={option.selected ? 'default' : 'outlined'}
            label={option.title}
          ></Chip>
        );
      }}
    />
  );
};

/*
const AutoCompleteWithChip = (props: AutoCompleteWithChipProps) => {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState<(AutoCompleteWithChipOption)[]>(props.selectedOptions);

  useEffect(() => {
    if (props.selectedOptions !== selectedOptions) {
      setSelectedOptions(props.selectedOptions);
    }
  }, [props.selectedOptions]);

  return (
    <Autocomplete
      size="small"
      multiple={true}
      filterSelectedOptions
      filterOptions={(x) => x}
      includeInputInList
      autoComplete
      classes={{
        option: classes.option,
      }}
      ListboxComponent={(listboxProps : any) => (
        <ListboxComponent {...listboxProps} />
      )}
      onInputChange={(event : any, newInputValue : any, reason : any) => {
        // setInputValue(newInputValue);
        if(props.onInputChange){
          props.onInputChange(event, newInputValue, reason);
        }
        
      }}
      onChange={(event, newValue, reason, details) => {
        if(typeof newValue !== 'string' ) {          
          props.onChange(event, newValue as AutoCompleteWithChipOption[]);
          setSelectedOptions(newValue);
        }        
      }} 
      options={props.options}
      // value={props.value ? props.value : ''}
      value={selectedOptions}
      getOptionLabel={(option : any) => typeof option === 'string' ? option : (option.title ? option.title : '')}
      renderOption={(props: any, option: any ) => {
        return (
          <Chip variant={option.selected ? 'default' : 'outlined'}  label={props.title}></Chip>
        );
      }}
      // disableClearable
      renderInput={(params : any) => (
        <TextField
          {...params}          
          variant="outlined"
          label={'Search'}
          fullWidth
        />
      )}
    />
  );
};
*/

export default AutoCompleteWithChip;
