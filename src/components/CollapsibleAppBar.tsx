import React, { useState, useEffect, Dispatch } from 'react';

import { Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MaterialIcon from './MaterialIcon';

const remToNumber = (value: string) => parseFloat(value.replace('rem', ''));
const pxToNumber = (value: string) => parseFloat(value.replace('px', ''));

const getValues = (theme: Theme) => ({
  toolbarDesktop: { min: theme.spacing(8), max: theme.spacing(32) },
  toolbarMobile: { min: theme.spacing(7), max: theme.spacing(32) },
  title: {
    min: remToNumber(theme.typography.h6.fontSize as string),
    max: remToNumber(theme.typography.h4.fontSize as string),
  },
  subtitle: {
    min: remToNumber(theme.typography.subtitle2.fontSize as string),
    max: remToNumber(theme.typography.subtitle1.fontSize as string),
  },
});

const scrollEvents = ['scroll', 'touchmove'];

const updateScroll = (setScroll: Dispatch<React.SetStateAction<number>>) =>
  setScroll(window.scrollY);

interface CollapsibleAppBar extends AppBarProps {
  title?: string;
  subtitle?: string;
  collapsing?: boolean;
}

const CollapsibleAppBar = ({
  title,
  subtitle,
  collapsing = false,
  children,
  ...props
}: CollapsibleAppBar) => {
  const theme = useTheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const smBreakpoint = useMediaQuery(theme.breakpoints.up('sm'));
  const [scroll, setScroll] = useState(window.scrollY);
  const values = getValues(theme);
  const toolbarValues = smBreakpoint
    ? values.toolbarDesktop
    : values.toolbarMobile;

  useEffect(() => {
    const eventListener = () => updateScroll(setScroll);
    if (collapsing) {
      setScroll(window.scrollY);
      scrollEvents.forEach((event) =>
        document.addEventListener(event, eventListener)
      );
    }
    return () => {
      if (collapsing)
        scrollEvents.forEach((event) =>
          document.removeEventListener(event, eventListener)
        );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsing]);

  return (
    <AppBar
      {...props}
      // Set app bar theme to primary/dark based on system dark theme setting
      color={prefersDarkMode ? 'default' : 'primary'}
    >
      <Toolbar
        style={
          collapsing
            ? {
                height: `clamp(${toolbarValues.min}, ${
                  pxToNumber(toolbarValues.max) - scroll
                }px, ${toolbarValues.max}`,
              }
            : {}
        }
      >
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={(theme) => ({
            marginInlineEnd: theme.spacing(2),
            alignSelf: 'flex-start',
            marginBlockStart: theme.spacing(1),
            [theme.breakpoints.up('sm')]: {
              marginBlockStart: theme.spacing(1.5),
            },
          })}
        >
          <MaterialIcon iconName='menu' />
        </IconButton>
        <Box
          {...(collapsing
            ? {
                sx: (theme) => ({
                  flexGrow: 1,
                  alignSelf: 'flex-end',
                  marginBlockEnd: theme.spacing(subtitle ? 0.625 : 1.5),
                  [theme.breakpoints.up('sm')]: {
                    marginBlockEnd: theme.spacing(subtitle ? 1.125 : 2),
                  },
                }),
              }
            : {})}
        >
          <Typography
            variant='h6'
            {...(collapsing
              ? { sx: (theme) => ({ fontSize: theme.typography.h4.fontSize }) }
              : {})}
            style={
              collapsing
                ? {
                    fontSize: `clamp(${values.title.min}rem, ${
                      values.title.max - scroll / 216
                    }rem, ${values.title.max}rem)`,
                    marginInlineStart: `clamp(${theme.spacing(-6)}, ${
                      pxToNumber(theme.spacing(-6)) + scroll / 3
                    }px, 0px)`,
                  }
                : {}
            }
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant='subtitle2'
              sx={(theme) => ({
                marginBlockStart: theme.spacing(-1),
                fontWeight: 'normal',
              })}
              style={
                collapsing
                  ? {
                      fontSize: `clamp(${values.subtitle.min}rem, ${
                        values.subtitle.max - scroll / 1536
                      }rem, ${values.subtitle.max}rem)`,
                      marginInlineStart: `clamp(${theme.spacing(-6)}, ${
                        pxToNumber(theme.spacing(-6)) + scroll / 3
                      }px, 0px)`,
                    }
                  : {}
              }
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default CollapsibleAppBar;
