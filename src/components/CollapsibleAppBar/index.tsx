import React, { useState, useEffect, Dispatch } from 'react';

import { styled } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MaterialIcon from 'components/MaterialIcon';
import classNames from 'classnames';

const remToNumber = (value: string) => parseFloat(value.replace('rem', ''));
const pxToNumber = (value: string) => parseFloat(value.replace('px', ''));

const getValues = (theme: Theme) => ({
  toolbarDesktop: {
    min: pxToNumber(theme.spacing(8)),
    max: pxToNumber(theme.spacing(18)),
  },
  toolbarMobile: {
    min: pxToNumber(theme.spacing(7)),
    max: pxToNumber(theme.spacing(16)),
  },
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
  type?: 'normal' | 'collapsing';
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  '&.MuiAppBar-transparent': {
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));',
    boxShadow: 'none',
    transition: 'none',
  },

  '& .MuiToolbar-root': {
    height: theme.spacing(7),
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(8),
    },

    '& .icon': {
      marginInlineEnd: `${theme.spacing(1)}`,
      width: theme.spacing(4),
      height: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(5),
        height: theme.spacing(5),
      },
    },
    '& .title-container': { flexGrow: 1, userSelect: 'none' },
    '& .title-margin': {
      alignSelf: 'flex-end',
      marginBlockEnd: theme.spacing(1.5),
      [theme.breakpoints.up('sm')]: { marginBlockEnd: theme.spacing(2) },
    },
    '& .subtitle-margin': {
      alignSelf: 'flex-end',
      marginBlockEnd: theme.spacing(0.75),
      [theme.breakpoints.up('sm')]: { marginBlockEnd: theme.spacing(1.125) },
    },
    '& .title-collapsing': { fontSize: theme.typography.h4.fontSize },
    '& .subtitle': {
      marginBlockStart: theme.spacing(-1),
      fontWeight: 'normal',
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.appBar + 1,
  width: '100%',
  top: 0,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const NavigationIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const ToolbarPadding = styled(Toolbar)(({ theme }) => ({
  '&.appbar-padding': {
    paddingBlockStart: getValues(theme).toolbarMobile.min,
    [theme.breakpoints.up('sm')]: {
      paddingBlockStart: getValues(theme).toolbarDesktop.min,
    },
  },
  '&.appbar-padding-collapsing': {
    paddingBlockStart: getValues(theme).toolbarMobile.max,
    [theme.breakpoints.up('sm')]: {
      paddingBlockStart: getValues(theme).toolbarDesktop.max,
    },
  },
}));

const CollapsibleAppBar = ({
  title,
  subtitle,
  type = 'normal',
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
    if (type === 'collapsing') {
      setScroll(window.scrollY);
      scrollEvents.forEach((event) =>
        document.addEventListener(event, eventListener)
      );
    }
    return () => {
      if (type === 'collapsing')
        scrollEvents.forEach((event) =>
          document.removeEventListener(event, eventListener)
        );
    };
  }, [type]);

  return (
    <>
      <StyledAppBar
        {...props}
        // Set app bar theme to primary/dark based on system dark theme setting
        color={prefersDarkMode ? 'default' : 'primary'}
      >
        <Toolbar
          style={
            type === 'collapsing'
              ? {
                  height: `clamp(${toolbarValues.min}px, ${
                    toolbarValues.max - scroll
                  }px, ${toolbarValues.max}px`,
                }
              : {}
          }
        >
          <div
            className={classNames(
              'title-container',
              type === 'collapsing' &&
                (subtitle ? 'subtitle-margin' : 'title-margin')
            )}
          >
            <Typography
              variant='h6'
              className={classNames(
                type === 'collapsing' && 'title-collapsing'
              )}
              style={
                type === 'collapsing'
                  ? {
                      fontSize: `clamp(${values.title.min}rem, ${
                        values.title.max - scroll / 75
                      }rem, ${values.title.max}rem)`,
                      marginInlineStart: `clamp(0px, ${
                        scroll / (smBreakpoint ? 1.625 : 1.5)
                      }px, ${theme.spacing(6)})`,
                    }
                  : {}
              }
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant='subtitle2'
                className='subtitle'
                style={
                  type === 'collapsing'
                    ? {
                        fontSize: `clamp(${values.subtitle.min}rem, ${
                          values.subtitle.max - scroll / 512
                        }rem, ${values.subtitle.max}rem)`,
                        marginInlineStart: `clamp(0px, ${
                          scroll / (smBreakpoint ? 1.625 : 1.5)
                        }px, ${theme.spacing(6)})`,
                      }
                    : {}
                }
              >
                {subtitle}
              </Typography>
            )}
          </div>
        </Toolbar>
      </StyledAppBar>
      <StyledToolbar>
        <NavigationIconButton edge='start' color='inherit' aria-label='menu'>
          <MaterialIcon iconName='menu' />
        </NavigationIconButton>
        <div>{children}</div>
      </StyledToolbar>
      <ToolbarPadding
        className={
          type === 'collapsing' ? 'appbar-padding-collapsing' : 'appbar-padding'
        }
      />
    </>
  );
};

export default CollapsibleAppBar;
