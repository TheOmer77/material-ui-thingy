import React, { useState, useCallback } from 'react';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

import ModalSheet from './ModalSheet';
import TestTermsAndConditions from './TestTermsAndConditions';

/** @typedef {"paper" | "body"} DialogScroll */

const useStyles = makeStyles((theme) => ({
  title: {
    marginBlockStart: theme.spacing(2),
    marginBlockEnd: theme.spacing(1),
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

const ModalSheetTest = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  /** @type {[DialogScroll, React.Dispatch<React.SetStateAction<DialogScroll>>]} */
  const [scroll, setScroll] = useState('paper');

  const openSheet = useCallback(
    /** @param {DialogScroll} scroll */
    (scroll) => {
      setScroll(scroll);
      setOpen(true);
    },
    []
  );
  const closeSheet = useCallback((scroll) => setOpen(false), []);

  return (
    <>
      <Typography className={classes.title}>Open sheet:</Typography>
      <div className={classes.buttons}>
        <Button variant='outlined' onClick={() => openSheet('paper')}>
          Scroll = paper
        </Button>
        <Button variant='outlined' onClick={() => openSheet('body')}>
          Scroll = body
        </Button>
      </div>
      <ModalSheet open={open} onClose={closeSheet} scroll={scroll}>
        <DialogTitle>Terms & Conditions</DialogTitle>
        <DialogContent>
          <DialogContentText component='div'>
            <TestTermsAndConditions />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSheet} color='primary'>
            Disagree
          </Button>
          <Button onClick={closeSheet} color='primary'>
            Agree
          </Button>
        </DialogActions>
      </ModalSheet>
    </>
  );
};

export default ModalSheetTest;
