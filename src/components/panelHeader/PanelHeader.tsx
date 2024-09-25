import React, { useEffect, useState } from 'react';
import { Box, Icon, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { NamedTupleMember } from 'typescript';

import { COLORS } from '../../styles/AppBizTheme';

const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: 700,
    fontSize: '24px',
    color: '#228BAC',
  },
  subHeader: {
    fontWeight: 400,
    fontSize: '14px',
    color: '#102A4F',
  },
}));

export interface OwnProps {
  header: string;
  subHeader?: string;
}
const PanelHeader = (props: OwnProps) => {
  const classes = useStyles();

  return (
    <Box width="100%" height="100%">
      <Typography className={classes.header}>{props.header}</Typography>
      {props.subHeader && <Typography className={classes.subHeader}>{props.subHeader}</Typography>}
    </Box>
  );
};

export default PanelHeader;
