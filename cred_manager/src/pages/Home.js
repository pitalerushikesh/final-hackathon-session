import React, { useEffect, useState } from "react";
import {
  Button,
  Fade,
  Grid,
  Modal,
  Backdrop,
  Box,
  Typography,
  FormLabel,
  TextField,
} from "@mui/material";
import { query, onSnapshot, collection } from "firebase/firestore";
import Base from "./Base";
import db, { handleCreateStore } from "../backend/firebase";

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [websiteName, setWebsiteName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [info, setInfo] = useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    Fetchdata();
  }, [handleCreateStore]);

  const Fetchdata = () => {
    const q = query(collection(db, "Storage"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      console.log(
        "Data",
        querySnapshot.docs.map((d) => d.data())
      );
      setInfo(querySnapshot.docs.map((d) => d.data()));
    });
  };

  return (
    <Base>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            Store Password
          </Button>
        </Grid>
        {info.map((item) => {
          <>
            <h1>{item.website}</h1>
            <h1>{item.username}</h1>
          </>;
        })}
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Add your credentials here
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{
                py: 4,
              }}
            >
              <Grid item xs={6}>
                <FormLabel
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Website Name
                </FormLabel>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="www.google.com"
                  required
                  onChange={(text) => {
                    setWebsiteName(text.target.value);
                    console.log(text);
                  }}
                  name="websiteName"
                  autoComplete="off"
                  value={websiteName}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Username/Email
                </FormLabel>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="johndoe@gmail.com"
                  required
                  type="email"
                  onChange={(text) => {
                    setUsername(text.target.value);
                    console.log(text);
                  }}
                  value={username}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Password
                </FormLabel>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="********"
                  required
                  type="password"
                  onChange={(text) => {
                    setPassword(text.target.value);
                  }}
                  value={password}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleCreateStore(websiteName, username, password);
                    handleClose();
                  }}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Base>
  );
};

export default Home;
