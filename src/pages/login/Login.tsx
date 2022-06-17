import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import Image from "../../images/login/login.jpg";
import ImageLogo from "../../images/login/logo.svg";

import { InputAdornment, IconButton } from "@mui/material";
import { AccountCircle, Lock, Visibility } from "@mui/icons-material";
import { useEffect } from "react";
import { ClienteService } from "../../shared/services/api/client/ClientService";

export const Login: React.FC = ({ children }) => {
  const theme = useTheme()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
 
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: theme.spacing(28),
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            style={{
              fontWeight: "bold",
            }}
            variant="h4"
          >
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility">
                      <Visibility />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  style={{
                    color: "#000",
                  }}
                  href="#"
                  variant="body2"
                >
                  {"Esqueci minha senha?"}
                </Link>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" justifyContent="center">
                <Button
                  style={{
                    borderRadius: 20,
                    backgroundColor: "#E4DB00",
                    color: "#000",
                    width: theme.spacing(30),
                    height: theme.spacing(5),
                    fontSize: theme.spacing(2.2),
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 4, mb: 2 }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
