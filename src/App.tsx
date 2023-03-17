import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import CollapsibleAppBar from 'components/CollapsibleAppBar';
import TestColorButtons from 'components/TestColorButtons';
import TestParagraph from 'components/TestParagraph';

const App = () => {
  return (
    <>
      <CollapsibleAppBar title='App' collapsing>
        <Button>Login</Button>
      </CollapsibleAppBar>
      <Container>
        <TestColorButtons />
        <TestParagraph />
      </Container>
    </>
  );
};

export default App;
