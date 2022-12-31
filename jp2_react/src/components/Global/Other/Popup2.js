import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export function Popup2(props) {
  const { title, children, openPopup2, setOpenPopup2 } = props;

  return (
    <Dialog
      open={openPopup2}
      maxWidth="md"
    >
      <DialogTitle
      >
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            color="secondary"
            onClick={() => {
              setOpenPopup2(false);
            }}
          >
            <CloseIcon color="error" />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
