import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import CollapsibleAppBar from 'components/CollapsibleAppBar';
import TestParagraph from 'components/TestParagraph';

const App = () => {
  return (
    <>
      <CollapsibleAppBar title='App' collapsing>
        <Button>Login</Button>
      </CollapsibleAppBar>
      <Container>
        <TestParagraph />
      </Container>
    </>
  );
};

export default App;
