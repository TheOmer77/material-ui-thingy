import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import AppBar from 'components/AppBar';
import { TestCards, TestColorButtons, TestList } from 'components/test';

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
        <TestColorButtons />
        <TestCards />
        <TestList />
      </StyledContainer>
    </>
  );
};

export default App;
