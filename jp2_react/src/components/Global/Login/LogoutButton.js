import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      size="small"
      variant="contained"
      color="warning"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Odhlásit
    </Button>
  );
};

export default LogoutButton;
