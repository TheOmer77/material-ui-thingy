import { styled } from '@mui/material';
import Button from '@mui/material/Button';

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

const TestColorButtons = () => {
  return (
    <Root>
      {(
        ['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const
      ).map((color) => (
        <Button key={color} color={color} variant='contained'>
          Button
        </Button>
      ))}
    </Root>
  );
};

export default TestColorButtons;
