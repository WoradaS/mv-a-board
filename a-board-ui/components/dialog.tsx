import { Dialog, SxProps, Theme } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: JSX.Element;
  sx?: SxProps<Theme>;
};

const AppDialog = (props: Props) => {
  const { open, setOpen, children, sx } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { borderRadius: "16px", ...sx } }}
    >
      {children}
    </Dialog>
  );
};

export default AppDialog;
