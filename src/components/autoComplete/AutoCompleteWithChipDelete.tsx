import React, {  useEffect } from 'react';
import { Box, Chip } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
  Autocomplete,
  AutocompleteInputChangeReason,
  createFilterOptions,
} from '@material-ui/lab';
import throttle from 'lodash/throttle';

import { getLanguageTranslate } from '../../i18n';
import { ConfirmationDialog } from '../deleteDialog/DeleteDialog';
import useStyles from './AutoCompleteWithChipDeleteStyles';

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
  onDelete?:(value: AutoCompleteWithChipOption | null) => void;
  isDelete?:boolean;
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

const AutoCompleteWithChipDelete = (props: AutoCompleteWithChipProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<AutoCompleteWithChipOption | null>(
    null,
  );
  const [chipToDelete, setchipToDelete] = React.useState<AutoCompleteWithChipOption | null>(
    null,
  );
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<AutoCompleteWithChipOption[]>(
    [],
  );
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

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
  // const deleteOption = (event:React.MouseEvent<{}>) =>{
  //   if(props.onDelete)
  //     props.onDelete(value);
  // };
  const onConfirmDeleteDialogClose=(isOk:boolean)=>{
    setOpenDeleteDialog(false);
    if(isOk && props.onDelete){
      props.onDelete(chipToDelete);
    }
  };
  const onDeleteChipClicked = (chip: AutoCompleteWithChipOption | null) => {
    setOpenDeleteDialog(true);
    setchipToDelete(chip);
  };

  return (
    <>
      <ConfirmationDialog message={chipToDelete?.title??''} onClose={onConfirmDeleteDialogClose} title={ getLanguageTranslate('components.billing.confirmDeleteMessage')} open={openDeleteDialog} key="deletedialog" ></ConfirmationDialog>

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
            <Box>
              <Chip
                variant={option.selected ? 'default' : 'outlined'}
                label={option.title}
                onDelete={()=>onDeleteChipClicked(option)}
              ></Chip>
              {/* {props.isDelete? <CloseIcon onClick={deleteOption} /> : null } */}
            </Box>
          );
        }}
      />
    </>

  );
};

export default AutoCompleteWithChipDelete;
