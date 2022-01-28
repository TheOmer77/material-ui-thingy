import React from 'react';
import classNames from 'classnames';

import Box from '@mui/material/Box';

/** @param {{ iconName: string, className: string } & import('@mui/material/Box').BoxProps} props */
const MaterialIcon = ({ iconName, className, ...props }) => (
  <Box
    component='i'
    className={classNames('material-icons', className)}
    {...props}
  >
    {iconName}
  </Box>
);

export default MaterialIcon;
