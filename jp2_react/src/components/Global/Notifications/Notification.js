import { Alert, Snackbar } from '@mui/material';
import React from 'react'

function Notification(props) {

    const {notify, setNotify} = props;

    const handleClose = (event,reason) => {
      setNotify({
        ...notify,
        isOpen: false
      })
    }

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={6000} //bude otevřeno po dobu 4 sec
      anchorOrigin={{ vertical: "top", horizontal: "center" }} //umístí notifikaci do horní části stránky uprostřed
      onClose={handleClose}
    >
      <Alert severity={notify.type || "info"} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

export default Notification