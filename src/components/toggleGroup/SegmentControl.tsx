import React from 'react';
import { withStyles } from '@material-ui/core';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import useStyles from './SegmentControlStyles';

export interface SegmentOption {
  title: string;
  value: string;
  large?: boolean;
  days?: number;
}

export interface OwnProps {
  segments: SegmentOption[];
  value?: SegmentOption;
  onChange?: (segmentOption?: SegmentOption) => void;
}

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    // margin: theme.spacing(0.5),
    // border: 'none',
    '&:not(:first-child)': {
      border: '2px solid white',
    },
    '&:first-child': {
      border: '2px solid white',
    },
  },
}))(ToggleButtonGroup);

const SegmentControl = (props: OwnProps) => {
  // const [alignment, setAlignment] = React.useState<string | null>('left');
  //const [value, setValue] = React.useState<string | null>(props.value?props.value:'');
  const classes = useStyles();

  // const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
  //   setAlignment(newAlignment);
  // };
  const handleValue = (
    event: React.MouseEvent<HTMLElement>,
    newValue: any | null,
  ) => {
    //setValue(newValue);
    if (newValue) {
      const selectedOption = props.segments.find((o) => o.value === newValue); //(event.target as HTMLInputElement).value);
      if (props.onChange) {
        props.onChange(selectedOption);
      }
    }
  };

  return (
    <ToggleButtonGroup
      value={props.value?.value}
      exclusive
      onChange={handleValue}
      aria-label="text alignment"
      size="small"
    >
      {props.segments.map((s, index) => {
        return (
          <ToggleButton
            classes={{
              selected: classes.selectedButton,
              root: s.large ? classes.rootLarge : classes.root,
              label: classes.buttonLabel,
            }}
            key={index}
            value={s.value}
            aria-label="left aligned"
          >
            {s.title}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

export default SegmentControl;
