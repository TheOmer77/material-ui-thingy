import { styled } from '@mui/material';
import Card from '@mui/material/Card';

const Root = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(0, 1),
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1),

  '& .MuiPaper-root': { width: theme.spacing(16), height: theme.spacing(16) },
}));

const TestCards = () => {
  return (
    <Root>
      {[...Array(25).keys()].map((key) => (
        <Card key={key} elevation={key} />
      ))}
    </Root>
  );
};

export default TestCards;
