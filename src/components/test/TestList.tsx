import { useState } from 'react';

import { styled } from '@mui/material';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import TestParagraph from './TestParagraph';
import AppBar from 'components/AppBar';
import CollapsedComponent from 'components/ContainerTransform/CollapsedComponent';
import ContainerTransform from 'components/ContainerTransform';
import ExpandedComponent from 'components/ContainerTransform/ExpandedComponent';
import MaterialIcon from 'components/MaterialIcon';

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
const listItems: { primaryText: string; secondaryText: string }[] = [
  ...Array(ITEMS_COUNT),
].map((_, index) => ({
  primaryText: `List Item ${index + 1}`,
  secondaryText: `I am the ${numberWithSuffix(index + 1)} item!`,
}));

const StyledContainerTransform = styled(ContainerTransform)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const ExpandedPaper = styled(Paper)({
  height: '100%',
  position: 'relative',
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  overflowY: 'auto',
});
ExpandedPaper.defaultProps = { square: true };

const TestList = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  return (
    <List>
      {listItems.map(({ primaryText, secondaryText }, index) => (
        <StyledContainerTransform
          key={`listItem-${index + 1}`}
          id={`listItem-${index + 1}`}
          expanded={expandedItem === index}
        >
          <CollapsedComponent>
            <ListItemButton
              onClick={() => setTimeout(() => setExpandedItem(index), 10)}
            >
              <ListItemText primary={primaryText} secondary={secondaryText} />
            </ListItemButton>
          </CollapsedComponent>
          <ExpandedComponent>
            <ExpandedPaper>
              <AppBar
                title={primaryText}
                collapsing
                navIcon={
                  <IconButton
                    edge='start'
                    size='large'
                    aria-label='back'
                    onClick={() => setExpandedItem(null)}
                  >
                    <MaterialIcon iconName='arrow_back' />
                  </IconButton>
                }
              />
              <Container>
                <TestParagraph />
              </Container>
            </ExpandedPaper>
          </ExpandedComponent>
        </StyledContainerTransform>
      ))}
    </List>
  );
};

export default TestList;
