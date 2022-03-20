import { useState, forwardRef, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert ref={ref} variant="filled" {...props} />;
});
export function SnackBar({ message, isOpen, severity, setError }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  console.log("open: ", open);
  const handleClose = () => {
    setOpen(false);
    setError({});
  };

  return (
    <div>
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
