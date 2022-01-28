import React, { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MaterialIcon from './MaterialIcon';

/** @param {string} value */
const remToNumber = (value) => parseFloat(value.replace('rem', ''));
/** @param {string} value */
const pxToNumber = (value) => parseFloat(value.replace('px', ''));

/** @param {import('@mui/material/styles').Theme} theme */
const getValues = (theme) => ({
  toolbarDesktop: { min: theme.spacing(8), max: theme.spacing(32) },
  toolbarMobile: { min: theme.spacing(7), max: theme.spacing(32) },
  title: {
    min: remToNumber(theme.typography.h6.fontSize),
    max: remToNumber(theme.typography.h4.fontSize),
  },
  subtitle: {
    min: remToNumber(theme.typography.subtitle2.fontSize),
    max: remToNumber(theme.typography.subtitle1.fontSize),
  },
});

const scrollEvents = ['scroll', 'touchmove'];

/** @param {React.Dispatch<React.SetStateAction<number>>} setScroll */
const updateScroll = (setScroll) => setScroll(window.scrollY);

const CollapsibleAppBar = ({
  title,
  subtitle,
  collapsing,
  children,
  ...props
}) => {
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
            : null
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
          sx={(theme) =>
            collapsing && {
              flexGrow: 1,
              alignSelf: 'flex-end',
              marginBlockEnd: theme.spacing(subtitle ? 0.625 : 1.5),
              [theme.breakpoints.up('sm')]: {
                marginBlockEnd: theme.spacing(subtitle ? 1.125 : 2),
              },
            }
          }
        >
          <Typography
            variant='h6'
            sx={(theme) =>
              collapsing && {
                fontSize: theme.typography.h4.fontSize,
              }
            }
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
                : null
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
                  : null
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
