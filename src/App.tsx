import { useState } from 'react';

import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import BlockButton from './components/BlockButton';
import CollapsibleAppBar from './components/CollapsibleAppBar';
import ControlSheet from './components/ControlSheet';
import MaterialIcon from './components/MaterialIcon';
import TestParagraph from './components/TestParagraph';
import ModalSheetTest from './components/ModalSheetTest';

import useGlobalState from 'hooks/useGlobalState';

const toggleButtons = [
  { id: 'wifi', label: 'WiFi', icon: 'wifi' },
  { id: 'bluetooth', label: 'Bluetooth', icon: 'bluetooth' },
  { id: 'mobileData', label: 'Mobile Data', icon: 'network_cell' },
  { id: 'location', label: 'Location', icon: 'place' },
] as const;
const initialToggleBtnsState = toggleButtons.reduce(
  (accumulator, current) => ({ ...accumulator, [current.id]: false }),
  {}
) as Record<typeof toggleButtons[number]['id'], boolean>;

const App = () => {
  const [{ blockBtnsVertical, collapsing, customClassname, hasSubtitle }] =
    useGlobalState();
  const [toggleButtonsState, setToggleButtonsState] = useState(
    initialToggleBtnsState
  );

  return (
    <>
      <CollapsibleAppBar
        collapsing={collapsing}
        title={collapsing ? 'Collapsing app bar!' : 'Just a normal app bar'}
        {...(hasSubtitle
          ? { subtitle: hasSubtitle && 'It can also have a subtitle' }
          : {})}
        sx={(theme) => ({
          transition: `box-shadow ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut} 0ms,
          background-color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut} 0ms,
          color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut} 0ms`,
          ...(customClassname && {
            background: theme.palette.background.default,
            color: theme.palette.primary.main,
            boxShadow: 'none',
            '@media (prefers-color-scheme: dark)': {
              color: theme.palette.primary.light,
            },
          }),
        })}
      />
      <ControlSheet />
      <Container
        sx={(theme) => ({
          paddingBlockStart: theme.spacing(collapsing ? 32 : 7),
          ...(!collapsing && {
            [theme.breakpoints.up('sm')]: {
              paddingBlockStart: theme.spacing(8),
            },
          }),
        })}
      >
        <Grid
          container
          spacing={1}
          sx={(theme) => ({
            paddingBlockStart: theme.spacing(2),
            '& .MuiButton-label': {
              transition: `color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
            },
          })}
        >
          {toggleButtons.map((btn) => (
            <Grid
              item
              xs={!blockBtnsVertical && 6}
              md={!blockBtnsVertical && 3}
              key={btn.id}
            >
              <BlockButton
                sx={(theme) => ({
                  backgroundColor: toggleButtonsState[btn.id]
                    ? theme.palette.primary.main
                    : alpha(theme.palette.primary.main, 0.125),
                  color: toggleButtonsState[btn.id]
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: toggleButtonsState[btn.id]
                      ? theme.palette.primary.dark
                      : alpha(theme.palette.primary.main, 0.25),
                  },
                })}
                color='primary'
                onClick={() =>
                  setToggleButtonsState((prev) => ({
                    ...prev,
                    [btn.id]: !prev[btn.id],
                  }))
                }
                startIcon={<MaterialIcon iconName={btn.icon} />}
                vertical={blockBtnsVertical}
                disableElevation
                fullWidth
              >
                {btn.label}
              </BlockButton>
            </Grid>
          ))}
        </Grid>
        <ModalSheetTest />
        <TestParagraph />
      </Container>
    </>
  );
};

export default App;
