import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import AppBar from 'components/AppBar';
import { TestCards, TestColorButtons, TestParagraph } from 'components/test';

const App = () => {
  return (
    <>
      <AppBar title='App' collapsing>
        <Button>Login</Button>
      </AppBar>
      <Container>
        <TestColorButtons />
        <TestCards />
        <TestParagraph />
      </Container>
    </>
  );
};

export default App;
