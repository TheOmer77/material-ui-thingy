import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ControllerCard from './components/ControllerCard';
import CollapsibleAppBar from './components/CollapsibleAppBar';
import BlockButton from './components/BlockButton';
import TestParagrqaph from './components/TestParagrqaph';
import MaterialIcon from './components/MaterialIcon';

import useGlobalStates from './hooks/useGlobalStates';

const useStyles = makeStyles((theme) => ({
  customAppBar: {
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    boxShadow: 'none',
    '@media (prefers-color-scheme: dark)': {
      color: theme.palette.primary.light,
    },
  },
  togglesContainer: {
    paddingBlockStart: theme.spacing(2),
    '& .MuiButton-label': {
      transition: `color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
    },
  },
  toggleBtnOff: {
    backgroundColor: fade(theme.palette.primary.main, 0.125),
    color: theme.palette.text.primary,
    '&:hover': { backgroundColor: fade(theme.palette.primary.main, 0.25) },
  },
  toggleBtnOn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': { backgroundColor: theme.palette.primary.dark },
  },
  content: {
    paddingBlockStart: theme.spacing(7),
    [theme.breakpoints.up('sm')]: { paddingBlockStart: theme.spacing(8) },
  },
  contentCollapsing: { paddingBlockStart: 256 },
}));

const toggleButtons = [
  { name: 'WiFi', icon: 'wifi' },
  { name: 'Bluetooth', icon: 'bluetooth' },
  { name: 'Mobile Data', icon: 'network_cell' },
  { name: 'Location', icon: 'place' },
];

const App = () => {
  const classes = useStyles();
  const {
    collapsing: [collapsing],
    hasSubtitle: [hasSubtitle],
    customClassname: [customClassname],
    blockBtnsVertical: [blockBtnsVertical],
  } = useGlobalStates();
  const [toggleButtonsState, setToggleButtonsState] = useState({
    ...toggleButtons.map((btn) => ({ [btn.name]: true })),
  });

  return (
    <>
      <CollapsibleAppBar
        collapsing={collapsing}
        title={collapsing ? 'Collapsing app bar!' : 'Just a normal app bar'}
        subtitle={hasSubtitle && 'It can also have a subtitle'}
        className={customClassname ? classes.customAppBar : null}
      />
      <ControllerCard />
      <Container
        className={collapsing ? classes.contentCollapsing : classes.content}
      >
        <Grid container spacing={1} className={classes.togglesContainer}>
          {toggleButtons.map((btn) => (
            <Grid
              item
              xs={!blockBtnsVertical && 6}
              md={!blockBtnsVertical && 3}
              key={btn.name}
            >
              <BlockButton
                className={
                  toggleButtonsState[btn.name]
                    ? classes.toggleBtnOn
                    : classes.toggleBtnOff
                }
                color='primary'
                onClick={() =>
                  setToggleButtonsState((prev) => ({
                    ...prev,
                    [btn.name]: !prev[btn.name],
                  }))
                }
                startIcon={<MaterialIcon iconName={btn.icon} />}
                vertical={blockBtnsVertical}
                disableElevation
                fullWidth
              >
                {btn.name}
              </BlockButton>
            </Grid>
          ))}
        </Grid>
        <TestParagrqaph />
      </Container>
    </>
  );
};

export default App;
