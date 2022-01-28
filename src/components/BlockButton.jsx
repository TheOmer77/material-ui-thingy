import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: theme.spacing(2),
    paddingInline: theme.spacing(3.5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rootVertical: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontSize: theme.typography.overline.fontSize,
    lineHeight: '.875rem',
  },
  verticalLabel: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  verticalIcon: {
    marginInline: 0,
    marginBlockEnd: theme.spacing(0.5),
  },
}));

/** @param {{vertical: boolean} & import('@material-ui/core/Button').ButtonProps */
const BlockButton = ({ children, vertical = false, ...props }) => {
  const classes = useStyles();
  return (
    <Button
      {...props}
      classes={{
        root: vertical ? classes.rootVertical : classes.root,
        label: vertical ? classes.verticalLabel : null,
        startIcon: vertical ? classes.verticalIcon : null,
        endIcon: vertical ? classes.verticalIcon : null,
      }}
    >
      {children}
    </Button>
  );
};

export default BlockButton;
