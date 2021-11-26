import React, { useState, useMemo, Fragment } from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import MaterialIcon from './MaterialIcon';
import useGlobalStates from '../hooks/useGlobalStates';

const CATEGORY_IDS = { APP_BAR: 'appBar', BLOCK_BTNS: 'blockBtns' };

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.common.white,
  },
  extendedIcon: { marginRight: theme.spacing(1) },
  container: {
    position: 'fixed',
    bottom: 0,
    paddingInline: 0,
    [theme.breakpoints.up('sm')]: { paddingInline: theme.spacing(3) },
  },
  sheet: {
    width: '100%',
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
    transform: 'translateY(100%)',
    transition: `transform ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
  },
  sheetOpen: { transform: 'translateY(0%)' },
  sheetTitle: { padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px` },
  list: { padding: 0 },
  listSubheader: { position: 'relative' },
}));

/**
 * @param {{ currentCategory: string }} props
 */
const ControlSheet = ({ currentCategory }) => {
  const classes = useStyles();

  const { collapsing, hasSubtitle, customClassname, blockBtnsVertical } =
    useGlobalStates();
  const [open, setOpen] = useState(false);

  /** @type {{ id: string; label: string; }[]} */
  const categories = useMemo(
    () => [
      { id: CATEGORY_IDS.APP_BAR, label: 'App bar' },
      { id: CATEGORY_IDS.BLOCK_BTNS, label: 'Block buttons' },
    ],
    []
  );

  /**
   * @type {{
   * id: string;
   * category: string;
   * label: string;
   * state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
   * }[]}
   */
  const listItems = useMemo(
    () => [
      {
        id: 'collapsing',
        category: CATEGORY_IDS.APP_BAR,
        label: 'Collapsing',
        state: collapsing,
      },
      {
        id: 'hasSubtitle',
        category: CATEGORY_IDS.APP_BAR,
        label: 'Has subtitle',
        state: hasSubtitle,
      },
      {
        id: 'customClassname',
        category: CATEGORY_IDS.APP_BAR,
        label: 'Custom classname',
        state: customClassname,
      },
      {
        id: 'blockBtnsVertical',
        category: CATEGORY_IDS.BLOCK_BTNS,
        label: 'Vertical',
        state: blockBtnsVertical,
      },
    ],
    [blockBtnsVertical, collapsing, customClassname, hasSubtitle]
  );

  return (
    <>
      <Fab
        variant='extended'
        color='secondary'
        aria-label='options'
        className={classes.fab}
        onClick={() => setOpen(true)}
      >
        <MaterialIcon iconName='settings' className={classes.extendedIcon} />
        Options
      </Fab>
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
        className={classes.backdrop}
      >
        <Container className={classes.container}>
          <Paper
            className={classNames(classes.sheet, open && classes.sheetOpen)}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant='h6' className={classes.sheetTitle}>
              Options
            </Typography>
            {categories.map((category) => (
              <List
                className={classes.list}
                subheader={
                  <ListSubheader className={classes.listSubheader}>
                    {category.label}
                  </ListSubheader>
                }
                key={category.id}
              >
                {listItems
                  .filter((item) => item.category === category.id)
                  .map(
                    ({ id, category, label, state: [state, setState] }) =>
                      (!currentCategory || currentCategory === category) && (
                        <ListItem
                          button
                          key={id}
                          onClick={() => setState((prev) => !prev)}
                        >
                          <ListItemText primary={label} />
                          <ListItemSecondaryAction>
                            <Switch
                              edge='end'
                              checked={state}
                              name={id}
                              onChange={() => setState((prev) => !prev)}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                  )}
              </List>
            ))}
          </Paper>
        </Container>
      </Backdrop>
    </>
  );
};

export default ControlSheet;
