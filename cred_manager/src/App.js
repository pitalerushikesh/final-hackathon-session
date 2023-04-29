import "./App.css";
import { Button, Container, Grid, Typography, Box } from "@mui/material";
import googleLogo from "./assets/logos/google.png";
import { signInWithGoogle } from "./backend/firebase.js";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await signInWithGoogle();
    console.log("USERRES", user);
    if (user) {
      console.log("USERRES", user);
      navigate("/home");
    }
  };
  return (
    <Container>
      <Grid
        maxWidth="lg"
        container
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <Grid
          xs={12}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <h1>Login</h1>
        </Grid>
        <Grid
          xs={12}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Button
            sx={{
              justifyContent: "space-between",
              flexDirection: "row",
              display: "flex",
              alignContent: "center",
              backgroundColor: "blue",
            }}
            onClick={() => handleLogin()}
          >
            <Box component="img" width="40px" src={googleLogo} />
            <Typography
              sx={{
                color: "#FFFFFF",
              }}
            >
              Login with Google
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
