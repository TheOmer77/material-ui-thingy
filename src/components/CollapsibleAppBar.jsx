import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MaterialIcon from './MaterialIcon';

/** @param {string} value */
const remToNumber = (value) => parseFloat(value.replace('rem', ''));

/** @param {import('@material-ui/core/styles').Theme} theme */
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

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginInlineEnd: theme.spacing(2),
    alignSelf: 'flex-start',
    marginBlockStart: theme.spacing(0.5),
    [theme.breakpoints.up('sm')]: { marginBlockStart: theme.spacing(1) },
  },
  titleContainer: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
  titleMargin: {
    marginBlockEnd: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: { marginBlockEnd: theme.spacing(2) },
  },
  subtitleMargin: {
    marginBlockEnd: theme.spacing(0.625),
    [theme.breakpoints.up('sm')]: { marginBlockEnd: theme.spacing(1.125) },
  },
  title: { fontSize: theme.typography.h4.fontSize },
  subtitle: {
    marginBlockStart: theme.spacing(1) * -1,
    fontWeight: 'normal',
  },
}));

const scrollEvents = ['scroll', 'touchmove'];

/** @param {React.Dispatch<React.SetStateAction<number>>} setScroll */
const updateScroll = (setScroll) => setScroll(window.scrollY);

const CollapsibleAppBar = ({
  title,
  subtitle,
  collapsing,
  className,
  children,
  ...props
}) => {
  const classes = useStyles();
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
      className={className}
      // Set app bar theme to primary/dark based on system dark theme setting
      color={prefersDarkMode ? 'default' : 'primary'}
    >
      <Toolbar
        style={
          collapsing
            ? {
                height: `clamp(${toolbarValues.min}px, ${
                  toolbarValues.max - scroll
                }px, ${toolbarValues.max}px`,
              }
            : null
        }
      >
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          className={classes.menuButton}
        >
          <MaterialIcon iconName='menu' />
        </IconButton>
        <div
          className={
            collapsing
              ? classNames(
                  classes.titleContainer,
                  subtitle ? classes.subtitleMargin : classes.titleMargin
                )
              : null
          }
        >
          <Typography
            variant='h6'
            className={collapsing ? classes.title : null}
            style={
              collapsing
                ? {
                    fontSize: `clamp(${values.title.min}rem, ${
                      values.title.max - scroll / 216
                    }rem, ${values.title.max}rem)`,
                    marginInlineStart: `clamp(-${theme.spacing(6)}px, ${
                      theme.spacing(6) * -1 + scroll / 3
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
              className={classes.subtitle}
              style={
                collapsing
                  ? {
                      fontSize: `clamp(${values.subtitle.min}rem, ${
                        values.subtitle.max - scroll / 1536
                      }rem, ${values.subtitle.max}rem)`,
                      marginInlineStart: `clamp(-${theme.spacing(6)}px, ${
                        theme.spacing(6) * -1 + scroll / 3
                      }px, 0px)`,
                    }
                  : null
              }
            >
              {subtitle}
            </Typography>
          )}
        </div>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default CollapsibleAppBar;
