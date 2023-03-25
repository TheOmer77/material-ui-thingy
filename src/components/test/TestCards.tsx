import { styled } from '@mui/material';
import Card from '@mui/material/Card';

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  display: 'grid',
  gap: theme.spacing(1),
  gridTemplateColumns: 'repeat(auto-fit, minmax(var(--card-size), 1fr))',
  '--card-size': theme.spacing(14),
  [theme.breakpoints.up('md')]: { '--card-size': theme.spacing(20) },

  '& .MuiPaper-root': { width: '100%', aspectRatio: '1 / 1' },
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
