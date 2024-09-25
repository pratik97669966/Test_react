import React from 'react';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import useStyles from './RadioButtonGroupStyles';

export interface RadioButtonOption {
  title: string;
  value: string;
  customData? : any;
}

export interface RadioButtonGroupProps {
  title?: string;
  options: RadioButtonOption[];
  displayDirection?: 'row' | 'column';
  value?: string;
  onChange?: (radioOption?: RadioButtonOption) => void;
}

const RadioButtonGroup = (props: RadioButtonGroupProps) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = props.options.find((o) => o.value === (event.target as HTMLInputElement).value);
    if(props.onChange){
      props.onChange(selectedOption);
    }
  };

  return (
    <FormControl component="fieldset" className={classes.root} >
      {props.title && <FormLabel component="legend">{props.title}</FormLabel>}
      <RadioGroup 
        className={props.displayDirection === 'column' ? classes.rootColumn : classes.root}
        aria-label="gender" 
        name="gender1" 
        value={props.value} onChange={handleChange}>
        {
          props.options && props.options.map((option, index) => {
            return (
              <FormControlLabel style={{marginRight:5}} key={index} value={option.value} control={<Radio color="primary" />} label={<Typography variant={'body2'}>{option.title}</Typography>} />
            );
          })
        }
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;