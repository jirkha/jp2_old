import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
//   makeStyles
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

// const useStyles = makeStyles((theme) => ({
//   dialogWrapper: {
//     padding: theme.spacing(2),
//     position: "absolute",
//     top: theme.spacing(5),
//   },
//   dialogTitle: {
//     paddingRight: "0px",
//   },
// }));

export function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
//   const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      //classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle
      //className={classes.dialogTitle}
      >
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            color="secondary"
            onClick={() => {
              setOpenPopup(false);
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
