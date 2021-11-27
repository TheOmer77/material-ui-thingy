import React, { useState } from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import BlockButton from './components/BlockButton';
import CollapsibleAppBar from './components/CollapsibleAppBar';
import ControlSheet from './components/ControlSheet';
import MaterialIcon from './components/MaterialIcon';
import TestParagrqaph from './components/TestParagrqaph';
import ModalSheetTest from './components/ModalSheetTest';

import useGlobalStates from './hooks/useGlobalStates';

const useStyles = makeStyles((theme) => ({
  appBarTransition: {
    transition: `box-shadow ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut} 0ms,
    background-color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut} 0ms,
    color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut} 0ms`,
  },
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
        className={classNames(
          classes.appBarTransition,
          customClassname && classes.customAppBar
        )}
      />
      <ControlSheet />
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
        <ModalSheetTest />
        <TestParagrqaph />
      </Container>
    </>
  );
};

export default App;
