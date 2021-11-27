import React, { forwardRef } from 'react';

import { makeStyles } from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

const Transition = forwardRef((props, ref) => (
  <Slide direction='up' ref={ref} {...props} />
));

const useStyles = makeStyles((theme) => ({
  container: { alignItems: 'flex-end' },
  modalSheet: {
    margin: `50vh 0 0 0`,
    borderRadius: ({ useBorderRadius }) =>
      useBorderRadius
        ? `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
        : 0,
    '&.MuiDialog-paperFullWidth': { width: '100%' },
    '@media (max-width: 663.95px)': {
      '&.MuiDialog-paperWidthSm.MuiDialog-paperScrollBody': {
        maxWidth: '100%',
      },
    },
  },
}));

/** @param {{ useBorderRadius?: boolean } & import('@material-ui/core/Dialog').DialogProps} props */
const ModalSheet = ({
  useBorderRadius = true,
  children,
  classes,
  ...props
}) => {
  const sheetClasses = useStyles({ useBorderRadius });
  return (
    <Dialog
      TransitionComponent={Transition}
      fullWidth={true}
      classes={{
        container: sheetClasses.container,
        paper: sheetClasses.modalSheet,
        ...classes,
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
};

export default ModalSheet;
