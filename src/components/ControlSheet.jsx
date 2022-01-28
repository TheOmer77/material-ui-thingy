import React, { useState, useEffect, useMemo } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Switch from '@mui/material/Switch';

import ModalSheet from './ModalSheet';
import MaterialIcon from './MaterialIcon';

import useGlobalStates from '../hooks/useGlobalStates';

const CATEGORY_IDS = { APP_BAR: 'appBar', BLOCK_BTNS: 'blockBtns' };

/**
 * @param {{ currentCategory: string }} props
 */
const ControlSheet = ({ currentCategory }) => {
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
        sx={(theme) => ({
          position: 'fixed',
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        })}
        onClick={() => setOpen(true)}
      >
        <MaterialIcon
          iconName='settings'
          sx={(theme) => ({ marginRight: theme.spacing(1) })}
        />
        Options
      </Fab>
      <ModalSheet open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Options</DialogTitle>
        {categories.map((category) => (
          <List
            sx={{
              paddingTop: 0,
              '& .MuiListSubheader-root': { backgroundColor: 'transparent' },
            }}
            subheader={
              <ListSubheader
                sx={(theme) => ({
                  position: 'relative',
                  lineHeight: theme.spacing(4),
                })}
              >
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
