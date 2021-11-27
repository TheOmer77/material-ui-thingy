import React, { useState, useEffect, useMemo } from 'react';

import { makeStyles } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';

import ModalSheet from './ModalSheet';
import MaterialIcon from './MaterialIcon';

import useGlobalStates from '../hooks/useGlobalStates';

const CATEGORY_IDS = { APP_BAR: 'appBar', BLOCK_BTNS: 'blockBtns' };

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: { marginRight: theme.spacing(1) },
  list: { paddingTop: 0 },
  listSubheader: { position: 'relative', lineHeight: `${theme.spacing(4)}px` },
}));

/**
 * @param {{ currentCategory: string }} props
 */
const ControlSheet = ({ currentCategory }) => {
  const classes = useStyles();

  const { collapsing, hasSubtitle, customClassname, blockBtnsVertical } =
    useGlobalStates();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    /** @param {KeyboardEvent} e */
    const listener = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) document.addEventListener('keydown', listener);
    else document.removeEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [open]);

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
      <ModalSheet open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Options</DialogTitle>
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
      </ModalSheet>
    </>
  );
};

export default ControlSheet;
