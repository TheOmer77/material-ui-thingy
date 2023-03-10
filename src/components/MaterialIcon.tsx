import classNames from 'classnames';
import Box, { BoxProps } from '@mui/material/Box';

interface MaterialIconProps extends BoxProps {
  iconName: string;
}

const MaterialIcon = ({ iconName, className, ...props }: MaterialIconProps) => (
  <Box
    component='i'
    className={classNames('material-icons', className)}
    {...props}
  >
    {iconName}
  </Box>
);

export default MaterialIcon;
