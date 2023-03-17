import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import AppBar from 'components/CollapsibleAppBar';
import TestCards from 'components/TestCards';
import TestColorButtons from 'components/TestColorButtons';
import TestParagraph from 'components/TestParagraph';

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
