import { Button, Snackbar, useTheme } from "@mui/material";

export default function HintBox({
  horizontal = null,
  vertical = null,
  open,
  onClose,
  message,
}) {
  const theme = useTheme();
  return (
    <Snackbar
      anchorOrigin={{ horizontal, vertical }}
      open={open}
      onClose={onClose}
      message={message}
      action={
        <Button
          color="secondary"
          size="small"
          onClick={onClose}
          sx={{ bgcolor: theme.palette.secondary.main, color: "white" }}
        >
          Dismiss and don&apos;t show again
        </Button>
      }
    />
  );
}
