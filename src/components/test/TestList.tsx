import type { ReactNode } from 'react';

import { styled } from '@mui/material';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import AppBar from 'components/AppBar';
import CollapsedComponent from 'components/ContainerTransform/CollapsedComponent';
import ContainerTransform from 'components/ContainerTransform';
import ExpandedComponent from 'components/ContainerTransform/ExpandedComponent';
import MaterialIcon from 'components/MaterialIcon';

export interface TestListItem {
  primaryText: string;
  secondaryText: string;
  content: ReactNode;
}

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

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const TestList = ({
  items,
  expandedItemIndex,
  onItemClick,
  onItemClose,
}: {
  items: TestListItem[];
  expandedItemIndex?: number;
  onItemClick?: (itemIndex?: number) => void;
  onItemClose?: () => void;
}) => (
  <List>
    {items.map(({ primaryText, secondaryText, content }, index) => (
      <StyledContainerTransform
        key={`listItem-${index + 1}`}
        id={`listItem-${index + 1}`}
        expanded={expandedItemIndex === index}
      >
        <CollapsedComponent>
          <ListItemButton
            onClick={() => setTimeout(() => onItemClick?.(index), 10)}
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
                  onClick={() => onItemClose?.()}
                >
                  <MaterialIcon iconName='arrow_back' />
                </IconButton>
              }
            />
            <StyledContainer>{content}</StyledContainer>
          </ExpandedPaper>
        </ExpandedComponent>
      </StyledContainerTransform>
    ))}
  </List>
);

export default TestList;
