import { useState } from 'react';
import classNames from 'classnames';

import { alpha, styled, Theme, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import AppBar from 'components/AppBar';
import { TestList } from 'components/test';

import listItems from 'constants/listItems';

import trianglesBg from 'assets/triangles-bg.svg';

const bgGradient = (theme: Theme, position: 'top' | 'bottom') => {
  const color =
    theme.palette.mode === 'dark' ? '#272727' : theme.palette.primary.main;
  const values = [color, alpha(color, 0)];
  return `linear-gradient(${(position === 'bottom'
    ? values.reverse()
    : values
  ).join(', ')})`;
};

const StyledContainer = styled('div')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    flexDirection: 'row',
  },

  '& .scrolling-container': {
    overflowY: 'auto',
    '&.MuiList-root': {
      height: `calc(100vh - ${theme.spacing(8)})`,
      '@supports (height: 100dvh)': {
        height: `calc(100dvh - ${theme.spacing(8)})`,
      },
    },
  },
  '& .list-container': {
    boxShadow: theme.shadows[2],
    zIndex: 1,
    minWidth: '50vw',
    [theme.breakpoints.up('lg')]: { minWidth: theme.spacing(64) },
  },
  '& .content-container': {
    padding: theme.spacing(2, 0),
    height: '100vh',
    '@supports (height: 100dvh)': { height: '100dvh' },

    '&:not(.selected-item-content)': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : theme.palette.primary.main,
      backgroundImage: `url("${trianglesBg}")`,
      backgroundPosition: 'center',
      position: 'relative',
      '&::before, &::after': {
        content: "''",
        width: '100%',
        height: theme.spacing(10),
        position: 'absolute',
      },
      '&::before': { top: 0, backgroundImage: bgGradient(theme, 'top') },
      '&::after': { bottom: 0, backgroundImage: bgGradient(theme, 'bottom') },
    },

    '&, & .MuiAppBar-root, & .MuiToolbar-root': {
      width: '50vw',
      [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${theme.spacing(64)})`,
      },
    },
  },
}));

const App = () => {
  const mdBreakpoint = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up('md')
  );
  const [selectedItem, setSelectedItem] = useState<number | undefined>();

  return (
    <>
      <AppBar
        title={mdBreakpoint ? '' : 'App'}
        collapsing={!mdBreakpoint}
        addPadding={!mdBreakpoint}
        color={mdBreakpoint ? 'transparent' : 'primary'}
        toolbarColor='primary'
      >
        <Button>Login</Button>
      </AppBar>
      <StyledContainer>
        {mdBreakpoint ? (
          <>
            <Paper className='list-container' square>
              <MuiAppBar position='static'>
                <MuiToolbar>
                  <Typography variant='h6'>App</Typography>
                </MuiToolbar>
              </MuiAppBar>
              <List className='scrolling-container'>
                {listItems.map(({ primaryText, secondaryText }, index) => (
                  <ListItemButton
                    key={index}
                    selected={selectedItem === index}
                    onClick={() => setSelectedItem(index)}
                  >
                    <ListItemText
                      primary={primaryText}
                      secondary={secondaryText}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
            <div
              className={classNames(
                'scrolling-container',
                'content-container',
                typeof selectedItem === 'number' && 'selected-item-content'
              )}
            >
              {typeof selectedItem === 'number' && (
                <AppBar
                  collapsing
                  title={listItems[selectedItem].primaryText}
                  subtitle={listItems[selectedItem].secondaryText}
                />
              )}
              <Container>
                {typeof selectedItem === 'number' &&
                  listItems[selectedItem].content}
              </Container>
            </div>
          </>
        ) : (
          <TestList
            items={listItems}
            expandedItemIndex={selectedItem}
            onItemClick={(itemIndex) => setSelectedItem(itemIndex)}
            onItemClose={() => setSelectedItem(undefined)}
          />
        )}
      </StyledContainer>
    </>
  );
};

export default App;
