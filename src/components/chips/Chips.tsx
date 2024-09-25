import React, { ReactNode } from 'react';
import { Box, Chip, Tooltip } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import useStyles from './ChipsStyles';

export enum ChipShape {
  RECTANGLE,
  ROUNDED,
  CIRCULAR,
  RECTANGLE_WITH_ICON,
}

export interface ChipOption {
  title: string;
  variant: 'default' | 'outlined';
  closable: boolean;
  onDelete?: () => void;
  onClick?: () => void;
  data?: any;
  type?:any;
  shape?: ChipShape;
  icon?: React.ReactElement;
}

export interface ChipsProps {
  options?: ChipOption[];
  justifyContent?: 'left' | 'center' | 'right';
  flexDirection?: 'row' | 'column';
}

const Chips = (props: ChipsProps) => {
  const classes = useStyles();

  return (
    <Box id="chipsId" flexDirection={props.flexDirection ? props.flexDirection : 'row'} justifyContent={props.justifyContent ? props.justifyContent : 'left'} className={classes.root}>
      {
        props.options && props.options.map((option, index) => {
          switch (option.shape) {
            case ChipShape.RECTANGLE: return <Chip classes={{
              root: classes.defaultRootChipRectangle,
              outlined: classes.outlinedRootChipRectangle,
            }}
            className={`${classes.chip} ${classes.rectangular}`}
            key={index}
            variant={option.variant}
            onDelete={option.onDelete}
            label={option.title}
            onClick={option.onClick}
            ></Chip>;
            case ChipShape.RECTANGLE_WITH_ICON: return <Chip classes={{
              root: classes.defaultRootChipRectangleWithIcon,
              outlined: classes.outlinedRootChipRectangleWithIcon,
              icon: classes.chipIconForRectangleWithIcon,
            }}
            className={`${classes.chip} ${classes.rectangular}`}
            key={index}
            variant={option.variant}
            onDelete={option.onDelete}
            label={option.title}
            onClick={option.onClick}
            icon={option.icon ? option.icon : <HomeIcon></HomeIcon>}
            ></Chip>;
            case ChipShape.ROUNDED: return (
              <Chip
                title={option.title}
                className={`${classes.chip}`}
                key={index} variant={option.variant}
                onDelete={option.onDelete}
                label={option.title}
                onClick={option.onClick}></Chip>
            );
            case ChipShape.CIRCULAR: return <Chip classes={{
              root: classes.defaultRootChipCircle,
              outlined: classes.outlinedRootChipCircle,
              label: classes.labelChipCircle,
            }} className={`${classes.chip} ${classes.circular}`} key={index} variant={option.variant} onDelete={option.onDelete} label={option.title} onClick={option.onClick}></Chip>;
          }
          return <Chip className={`${classes.chip}`} key={index} variant={option.variant} onDelete={option.onDelete} label={option.title} onClick={option.onClick}></Chip>;
        })
      }
    </Box>
  );
};

export default Chips;