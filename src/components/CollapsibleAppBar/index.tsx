import { useState, useEffect, Dispatch } from 'react';
import classNames from 'classnames';

import { styled } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MaterialIcon from 'components/MaterialIcon';

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

interface CollapsibleAppBarProps extends AppBarProps {
  title?: string;
  subtitle?: string;
  collapsing?: boolean;
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
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.primary.contrastText,

  '& > .MuiIconButton-root, & > .actions-container > *': { color: 'inherit' },
  '& > .MuiIconButton-root:first-of-type': { marginRight: theme.spacing(2) },
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
  collapsing = false,
  color = 'primary',
  children,
  ...props
}: CollapsibleAppBarProps) => {
  const theme = useTheme();
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
  }, []);

  return (
    <>
      {!(color === 'transparent' && !title?.length) && (
        <StyledAppBar {...props} color={color}>
          <Toolbar
            style={
              collapsing
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
                collapsing && (subtitle ? 'subtitle-margin' : 'title-margin')
              )}
            >
              <Typography
                variant='h6'
                className={classNames(collapsing && 'title-collapsing')}
                style={
                  collapsing
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
                    collapsing
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
      )}
      <StyledToolbar>
        <IconButton edge='start' size='large' aria-label='menu'>
          <MaterialIcon iconName='menu' />
        </IconButton>
        <div className='actions-container'>{children}</div>
      </StyledToolbar>
      <ToolbarPadding
        className={collapsing ? 'appbar-padding-collapsing' : 'appbar-padding'}
      />
    </>
  );
};

export default CollapsibleAppBar;
