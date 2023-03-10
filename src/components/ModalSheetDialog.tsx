import { forwardRef, ReactElement, Ref } from 'react';

import Dialog, { DialogProps } from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => (
    <Slide direction='up' ref={ref} {...props} />
  )
);

const ModalSheet = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      fullWidth={true}
      sx={(theme) => ({
        '& .MuiDialog-container': { alignItems: 'flex-end' },
        '& 	.MuiDialog-paper': {
          margin: `50vh 0 0 0`,
          borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
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
