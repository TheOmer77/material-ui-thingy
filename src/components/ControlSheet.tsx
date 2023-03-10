import React, { useState, useEffect, useMemo } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Switch from '@mui/material/Switch';

import MaterialIcon from './MaterialIcon';
import useGlobalStates from 'hooks/useGlobalState';
import { GlobalState } from 'contexts/globalState';

const CATEGORIES = [
  { id: 'appBar', label: 'App bar' },
  { id: 'blockBtns', label: 'Block buttons' },
] as const;

interface ControlSheetListItem {
  id: keyof GlobalState;
  category: typeof CATEGORIES[number]['id'];
  label: string;
  state: GlobalState[keyof GlobalState];
}

interface ControlSheetProps {
  currentCategory?: typeof CATEGORIES[number]['id'];
}

const ControlSheet = ({ currentCategory }: ControlSheetProps) => {
  const [
    { collapsing, hasSubtitle, customClassname, blockBtnsVertical },
    setGlobalState,
  ] = useGlobalStates();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) document.addEventListener('keydown', listener);
    else document.removeEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [open]);

  const listItems = useMemo<ControlSheetListItem[]>(
    () => [
      {
        id: 'collapsing',
        category: 'appBar',
        label: 'Collapsing',
        state: collapsing,
      },
      {
        id: 'hasSubtitle',
        category: 'appBar',
        label: 'Has subtitle',
        state: hasSubtitle,
      },
      {
        id: 'customClassname',
        category: 'appBar',
        label: 'Custom classname',
        state: customClassname,
      },
      {
        id: 'blockBtnsVertical',
        category: 'appBar',
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
      <Drawer
        anchor='bottom'
        open={open}
        onClose={() => setOpen(false)}
        sx={(theme) => ({
          '& .MuiDrawer-paper': {
            maxWidth: theme.breakpoints.values.sm,
            mx: 'auto',
            borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
          },
        })}
      >
        <DialogTitle>Options</DialogTitle>
        {CATEGORIES.map((category) => (
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
                ({ id, category, label, state }) =>
                  (!currentCategory || currentCategory === category) && (
                    <ListItemButton
                      key={id}
                      onClick={() => setGlobalState({ [id]: !state })}
                    >
                      <ListItemText primary={label} />
                      <ListItemSecondaryAction>
                        <Switch
                          edge='end'
                          checked={state}
                          name={id}
                          onChange={() => setGlobalState({ [id]: !state })}
                        />
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  )
              )}
          </List>
        ))}
      </Drawer>
    </>
  );
};

export default ControlSheet;
