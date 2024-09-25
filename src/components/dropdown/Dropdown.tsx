import React, { ReactNode } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import useStyles from './DropdownStyles';

export interface DropdownOption {
    label?: ReactNode; 
    title : string;
    value : string;
}

export interface DropdownProps { 
    title? : string;
    options : DropdownOption[];
    value?: string;
    disabled?:boolean;
    onChange?: (value?: DropdownOption) => void;
    width?:string;
}

const Dropdown = (props : DropdownProps) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const valueFromDropdow = event.target.value as string;
    
    const valueToSend=props.options.find(x=>x.value===valueFromDropdow);
    if(props.onChange){
      props.onChange(valueToSend);
    }
  };
    
  return (
    <FormControl className={classes.formControl} style={{width:props.width? props.width:''}} disabled={props.disabled}>      
      {props.title && <InputLabel id="demo-simple-select-label">{props.title}</InputLabel> }      
      <Select disabled={props.disabled?props.disabled:false}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        onChange={handleChange}
      >      
        {
          props.options && props.options.map((option, index) => {
            return (
              <MenuItem key={index} value={option.value}>{option.title}</MenuItem>
            );
          })
        }
      </Select>
    </FormControl>
  );
};

export default Dropdown;