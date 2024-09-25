import React, { ReactNode, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ padding: 0 }}>
          {children}
        </Box>
      )}

      {/* {
        value === index ? (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        ) : 
          (
            <Box p={3} visibility="hidden">
              <Typography>{children}</Typography>
            </Box>
          )
      } */}
    </div>
  );
}
function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export interface TabOption {
  title: string;
  panel: ReactNode;
}

export interface OwnProps {
  tabs: TabOption[];
  onChange?: (value?: any) => void;
}

export default function TabsContainer(props: OwnProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (props.tabs.length - 1 < value) {
      setValue(props.tabs.length - 1);
      handleChange(undefined, 0); // Added to set 0th tab selected byDefault
    }
  }, [props.tabs]);

  const handleChange = (event: React.ChangeEvent<{}> | undefined, newValue: number) => {
    setValue(newValue);
    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar color="transparent" position="static" elevation={1}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {props.tabs.map((t, index) => {
            return <Tab key={index} label={t.title} {...a11yProps(index)} />;
          })}
          test
        </Tabs>
      </AppBar>
      {props.tabs.map((t, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            {t.panel}
          </TabPanel>
        );
      })}
    </div>
  );
}
