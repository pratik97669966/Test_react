import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, IconButton, InputLabel, ListItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import useStyles from './CheckboxStyles';

export interface CheckboxOption {
  title: string;
  groupId:string;
  checked: boolean;
  onEdit: () => void;
}

export interface ChecboxProps {
  options: CheckboxOption[];
  onChange?: (value?: CheckboxOption) => void;
  onCheckboxChange:(isChecked:boolean, groupId:string)=> void;
}

const CheckboxList = (props: ChecboxProps) => {
  const classes = useStyles();
  const data = props.options
    .filter(function (item) {
      return item.checked === true;
    })
    .map(function ({ title }) {
      return title;
    });

  const [checked, setChecked] = React.useState(data);
  const [activeGroup, setActiveGroup] = useState('');

  const handleToggle = (value: CheckboxOption) => () => {
    const currentIndex = checked.indexOf(value.title);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value.title);
      props.onCheckboxChange(true, value.groupId);
    } else {
      newChecked.splice(currentIndex, 1);
      props.onCheckboxChange(false, value.groupId);
    }
    setChecked(newChecked);
  };

  const setActiveLabel = (item: CheckboxOption, index: number) => () => {
    setActiveGroup(item.title + index);
    item.onEdit();
  };

  return (
    <Box sx={{ width: '100%', padding: '0px;' }}>
      {props.options.map((item, index) => {
        return (
          <ListItem
            key={item.title + index}
            className={activeGroup === item.title + index ?  classes.active +' ' + classes.checkboxlabel : 'disable ' + classes.checkboxlabel}
          >
            {item.checked?
              <Checkbox onChange={handleToggle(item)} defaultChecked classes={{ root: classes.checkboxUnchecked, checked: classes.checkboxChecked }} />
              :
              <Checkbox onChange={handleToggle(item)}  classes={{ root: classes.checkboxUnchecked, checked: classes.checkboxChecked }} />
            } 
            <InputLabel
              htmlFor="login"
              style={{ display: 'inline', cursor: 'pointer', color: '#102A4F', fontSize: '16px' }}
              onClick={setActiveLabel(item, index)}
            >
              {item.title}
            </InputLabel>
            {/* <IconButton onClick={item.onEdit}>
              <EditIcon fontSize="small" />
            </IconButton> */}
          </ListItem>
          // <ListItem key={item.title+ index} className={classes.checkboxlabel}>
          //   <FormControlLabel
          //     style={{ padding: "0px", minWidth:"115px" }}
          //     control={
          //       <Checkbox onChange={handleToggle(item.title)}  classes={{ root: classes.checkboxUnchecked, checked: classes.checkboxChecked }} />
          //     }
          //     label={`${item.title}`}
          //   />
          //   <IconButton onClick={item.onEdit}>
          //     <EditIcon fontSize="small" />
          //   </IconButton>
          // </ListItem>
        );
      })}
    </Box>
  );
};

export default CheckboxList;
