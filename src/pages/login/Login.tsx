import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContext } from "../../shared/contexts";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Mulher from "../../images/login/Mulher.jpg";

interface State {
  password: string,
  showPassword: boolean,
  usuario: string,
}

export const Login: React.FC = ({ children }) => {

  //campo password
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
    usuario: "",
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //autenticação com o back
  const { isAuthenticated, login} = useAuthContext();
  if (isAuthenticated) return <>{children}</>;
  return (
    <Grid container>
      <Grid
        xs={1}
        sm={8}
        md={8}
        item
        sx={{
          height: "100vh",
          backgroundImage: `url(${Mulher})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
      ></Grid>

      <Grid
        xs={11}
        sm={4}
        md={4}
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography fontSize={40} fontWeight={700} marginBottom={4}>
            Login
          </Typography>
          <TextField
            type={'text'}
            label="Usuário"
            value={values.usuario}
            onChange={handleChange("usuario")}
            id="outlined-start-adornment"
            sx={{ width: "100%", m: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ width: "100%", m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
            />
          </FormControl>
          <Typography
            color="text.secondary"
            sx={{ alignSelf: "end" }}
            marginBottom={4}
          >
            Esqueci minha senha?
          </Typography>
          <Button
            onClick={()=>login(values.usuario, values.password)}
            sx={{
              fontSize:'24px',
              fontStyle: 'normal',
              fontWeight: 500,
              height: 50,
              width: "60%",
              boxShadow: "none",
              borderRadius: 10,
              color: '#000000'
            }}
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
