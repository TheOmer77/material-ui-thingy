import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import AppBar from 'components/AppBar';
import { TestList } from 'components/test';

import listItems from 'constants/listItems';

const StyledContainer = styled(Container)({
  padding: 0,
});

const App = () => {
  return (
    <>
      <AppBar title='App' collapsing>
        <Button>Login</Button>
      </AppBar>
      <StyledContainer>
        <TestList items={listItems} />
      </StyledContainer>
    </>
  );
};

export default App;
