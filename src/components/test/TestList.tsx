import { ReactNode, useState } from 'react';

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

const TestList = ({
  items,
}: {
  items: {
    primaryText: string;
    secondaryText: string;
    content: ReactNode;
  }[];
}) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  return (
    <List>
      {items.map(({ primaryText, secondaryText }, index) => (
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
