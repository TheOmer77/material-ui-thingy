import { useState } from 'react';

import { styled, Theme, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import AppBar from 'components/AppBar';
import { TestList } from 'components/test';

import listItems from 'constants/listItems';

const StyledContainer = styled('div')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    flexDirection: 'row',
  },

  '& .scrolling-container': {
    overflowY: 'auto',
    height: `calc(100vh - ${theme.spacing(8)})`,
    '@supports (height: 100dvh)': {
      height: `calc(100dvh - ${theme.spacing(8)})`,
    },

    '&.list-container': {
      minWidth: '50vw',
      [theme.breakpoints.up('lg')]: { minWidth: theme.spacing(64) },
    },
    '&.content-container': { flexGrow: 1, padding: theme.spacing(2, 0) },
  },
}));

const App = () => {
  const mdBreakpoint = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up('md')
  );
  const [selectedItem, setSelectedItem] = useState<number | undefined>();

  return (
    <>
      <AppBar title='App' collapsing={!mdBreakpoint}>
        <Button>Login</Button>
      </AppBar>
      <StyledContainer>
        {mdBreakpoint ? (
          <>
            <Paper className='scrolling-container list-container' square>
              <List>
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
            <div className='scrolling-container content-container'>
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
