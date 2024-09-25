import React from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import minusIcon from '../../assets/cms/MinusIcon.svg';
import plusIcon from '../../assets/cms/PlusIcon.svg';
import { COLORS } from '../../styles/AppBizTheme';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: '50px',
    width: '50px',
  },
  buttonName: {
    border: 'none',
    pointerEvents: 'none',
    width: '40%',
    minWidth: '50px',
    padding: '0px',
    textAlign: 'center',
    color: COLORS.BLACK,
    fontWeight: 'normal',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
  },
  icon: {
    width: '30%',
  },
}));

export interface OwnProps {
  onValueChange: (value: number) => void;
  value: number;
  className?: string; // Add className prop
}

const Incrementer: React.FC<OwnProps> = ({ onValueChange, value, className }) => {
  const classes = useStyles();

  const increment = () => {
    onValueChange(value + 1);
  };

  const decrement = () => {
    if (value <= 0) return;
    onValueChange(value - 1);
  };

  return (
    <div className={`${classes.root} ${className || ''}`}>
      <img className={classes.icon} src={minusIcon} onClick={decrement} alt="No Image" />
      <Typography variant="subtitle1" className={classes.buttonName}>
        {value}
      </Typography>
      <img className={classes.icon} src={plusIcon} onClick={increment} alt="No Image" />
    </div>
  );
};

export default Incrementer;
