import Button, { ButtonProps } from '@mui/material/Button';

interface BlockButtonProps extends ButtonProps {
  vertical?: boolean;
}
const BlockButton = ({
  children,
  vertical = false,
  sx,
  ...props
}: BlockButtonProps) => (
  <Button
    {...props}
    sx={[
      (theme) => ({
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
      }),
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {children}
  </Button>
);

export default BlockButton;
