import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

import ModalSheet from './ModalSheet';
import TestTermsAndConditions from './TestTermsAndConditions';

/** @typedef {"paper" | "body"} DialogScroll */

const ModalSheetTest = () => {
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
  const closeSheet = useCallback(() => setOpen(false), []);

  return (
    <>
      <Typography
        sx={(theme) => ({
          marginBlockStart: theme.spacing(2),
          marginBlockEnd: theme.spacing(1),
        })}
      >
        Open sheet:
      </Typography>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing(1),
          justifyContent: 'flex-start',
          alignItems: 'center',
        })}
      >
        <Button variant='outlined' onClick={() => openSheet('paper')}>
          Scroll = paper
        </Button>
        <Button variant='outlined' onClick={() => openSheet('body')}>
          Scroll = body
        </Button>
      </Box>
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
