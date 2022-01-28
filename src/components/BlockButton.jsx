import React from 'react';
import Button from '@mui/material/Button';

/** @param {{vertical: boolean} & import('@mui/material/Button').ButtonProps */
const BlockButton = ({ children, vertical = false, sx, ...props }) => (
  <Button
    {...props}
    sx={(theme) => ({
      flexDirection: vertical ? 'column' : 'row',
      ...(vertical
        ? {
            width: theme.spacing(10),
            height: theme.spacing(10),
            fontSize: theme.typography.overline.fontSize,
            lineHeight: '.875rem',
            alignItems: 'center',
            '& > .MuiButton-startIcon': {
              marginInline: 0,
              marginBlockEnd: theme.spacing(0.5),
            },
          }
        : {
            paddingBlock: theme.spacing(2),
            paddingInline: theme.spacing(3.5),
            justifyContent: 'flex-start',
          }),
      ...(typeof sx === 'function' ? sx(theme) : sx),
    })}
  >
    {children}
  </Button>
);

export default BlockButton;
