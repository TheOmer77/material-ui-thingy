import type { ReactNode } from 'react';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import AppBar from 'components/AppBar';
import {
  TestCards,
  TestColorButtons,
  TestList,
  TestParagraph,
} from 'components/test';

const ITEMS_COUNT = 25;
const numberWithSuffix = (number: number) => {
  const digits = String(number)
    .split('')
    .map((digit) => Number(digit));
  const lastDigit = digits[digits.length - 1];

  return (number < 10 || number > 20) && lastDigit > 0 && lastDigit < 4
    ? lastDigit === 1
      ? number + 'st'
      : lastDigit === 2
      ? number + 'nd'
      : lastDigit === 3 && number + 'rd'
    : number + 'th';
};
const listItems: {
  primaryText: string;
  secondaryText: string;
  content: ReactNode;
}[] = [...Array(ITEMS_COUNT)].map((_, index) => ({
  primaryText: `List Item ${index + 1}`,
  secondaryText: `I am the ${numberWithSuffix(index + 1)} item!`,
  content: <TestParagraph />,
}));

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
        <TestList items={listItems} />
      </StyledContainer>
    </>
  );
};

export default App;
