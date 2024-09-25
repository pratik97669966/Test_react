import React, { ReactNode } from 'react';
import { makeStyles, Typography, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepContent from '@material-ui/core/StepContent';
import { StepIconProps } from '@material-ui/core/StepIcon';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import clsx from 'clsx';

import { COLORS } from '../../styles/AppBizTheme';
import useStyles from './QupStepperStyles';

export interface QupStepperOption {
  title: string;
  icon: ReactNode;
  activeIcon: ReactNode;
}

export interface QupStepperProps {
  someProps?: string;
  currentStep: number;
  options: QupStepperOption[];
  onMenuSelect: (selectedMenu: QupStepperOption, index: number) => void;
}

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#ffffff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    // backgroundImage:
    //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    // boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    // border : '1px solid red',
    width: '82px',
    height: '82px',
    overflow: 'hidden',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  // active: {
  //   '& $line': {
  //     backgroundImage:
  //       'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
  //   },
  // },
  // completed: {
  //   '& $line': {
  //     backgroundImage:
  //       'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
  //   },
  // },
  lineVertical: {
    minHeight: '15px',

  },
  line: {
    height: 3,
    border: 2,
    backgroundColor: COLORS.ORANGE,
    borderRadius: 1,
  },
  vertical: {
    color: 'red',
    marginLeft: '58px',
    width: '3px',
    minHeight: '10px',
  },
})(StepConnector);

const QupStepperOption = (props: QupStepperProps) => {
  const classes = useStyles();
  const classesForIcon = useColorlibStepIconStyles();

  const handleSelection = (option: QupStepperOption, index: number) => {
    props.onMenuSelect(option, index);
  };

  const getStepIcon = (stepProps: StepIconProps) => {
    const { active, completed, icon } = stepProps;

    return (
      <div
        className={clsx(classesForIcon.root, {
          [classesForIcon.active]: active,
        })}
      >
        {
          active ? props.options[Number(icon) - 1] ? props.options[Number(icon) - 1].activeIcon : <SettingsIcon /> :
            props.options[Number(icon) - 1] ? props.options[Number(icon) - 1].icon : <SettingsIcon />
        }
      </div>
    );
  };

  return (
    <Stepper classes={{
      root: classes.stepperRoot,
    }}
      activeStep={props.currentStep}
      orientation="vertical"
      connector={<ColorlibConnector></ColorlibConnector>}
    >
      {props.options.map((option, index) => (
        <Step key={option.title} expanded={props.currentStep === index} onClick={(e) => { handleSelection(option, index); }}>
          <StepLabel classes={{
            iconContainer: classes.iconContainer,
          }} className={classes.stepLabel} StepIconComponent={getStepIcon}>{option.title}</StepLabel>
          <StepContent classes={{
            root: classes.stepContent,
          }}>
            <div className={classes.actionsContainer}>
            </div>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

export default QupStepperOption;