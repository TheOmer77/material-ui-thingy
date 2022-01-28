import React, { forwardRef } from 'react';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = forwardRef((props, ref) => (
  <Slide direction='up' ref={ref} {...props} />
));

/** @param {{ useBorderRadius?: boolean } & import('@material-ui/core/Dialog').DialogProps} props */
const ModalSheet = ({ useBorderRadius = true, children, ...props }) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      fullWidth={true}
      sx={(theme) => ({
        '& .MuiDialog-container': { alignItems: 'flex-end' },
        '& 	.MuiDialog-paper': {
          margin: `50vh 0 0 0`,
          borderRadius: useBorderRadius
            ? `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
            : 0,
          '&.MuiDialog-paperFullWidth': { width: '100%' },
          '@media (max-width: 663.95px)': {
            '&.MuiDialog-paperWidthSm.MuiDialog-paperScrollBody': {
              maxWidth: '100%',
            },
          },
        },
      })}
      {...props}
    >
      {children}
    </Dialog>
  );
};

export default ModalSheet;
