import React from "react";
import { Grid, Button } from "@mui/material";
import { auth } from "../backend/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const user = auth?.currentUser?.displayName
    ? auth?.currentUser?.displayName
    : "";

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" display="flex">
      <Grid xs={6} justifyContent="center" alignItems="center" display="flex">
        <h1>Hi {user}</h1>
      </Grid>
      <Grid xs={6} justifyContent="center" alignItems="center" display="flex">
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default Navbar;
