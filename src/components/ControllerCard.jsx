import React from 'react';

import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import useGlobalStates from '../hooks/useGlobalStates';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    position: 'fixed',
    insetBlockEnd: theme.spacing(1),
    marginInline: theme.spacing(1),
  },
}));

const ControllerCard = () => {
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
  const classes = useStyles();
  return (
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
  );
};

export default ControllerCard;
