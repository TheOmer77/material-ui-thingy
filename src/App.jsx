import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CollapsibleAppBar from './components/CollapsibleAppBar';
import BlockButton from './components/BlockButton';
import TestParagrqaph from './components/TestParagrqaph';

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
  card: {
    padding: theme.spacing(2),
    position: 'fixed',
    insetBlockEnd: theme.spacing(1),
    marginInline: theme.spacing(1),
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
    collapsing,
    setCollapsing,
    hasSubtitle,
    setHasSubtitle,
    customClassname,
    setCustomClassname,
    blockBtnsVertical,
    setBlockBtnsVertical,
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
      <Card className={classes.card} elevation={4}>
        <Typography variant='h6'>App bar</Typography>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={collapsing}
                onChange={(event) => setCollapsing(event.target.checked)}
                name='collapsing'
              />
            }
            label='Collapsing'
          />
          <FormControlLabel
            control={
              <Switch
                checked={hasSubtitle}
                onChange={(event) => setHasSubtitle(event.target.checked)}
                name='hasSubtitle'
              />
            }
            label='Has subtitle'
          />
          <FormControlLabel
            control={
              <Switch
                checked={customClassname}
                onChange={(event) => setCustomClassname(event.target.checked)}
                name='customClassname'
              />
            }
            label='Custom classname'
          />
        </FormGroup>
        <Typography variant='h6'>Block buttons</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={blockBtnsVertical}
                onChange={(event) => setBlockBtnsVertical(event.target.checked)}
                name='blockBtnsVertical'
              />
            }
            label='Vertical'
          />
        </FormGroup>
      </Card>
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
                startIcon={<i className='material-icons'>{btn.icon}</i>}
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
