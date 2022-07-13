import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useAuthContext } from "../../shared/contexts"
import { useEffect, useRef, useState } from "react"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LockIcon from "@mui/icons-material/Lock"
import Mulher from "../../images/login/Mulher.jpg"
import Logo from "../../images/login/logo.svg"
import {
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
} from "@mui/material"

interface State {
  password: string
  showPassword: boolean
  usuario: string
}

export const Login: React.FC = ({ children }) => {

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
    usuario: "",
  })

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  //login loading
  const [loading, setLoading] = useState(false)

  const [success, setSuccess] = useState(false)

  const timer = useRef<number>()

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = window.setTimeout(() => {
        setSuccess(true)
        setLoading(false)
      }, 2000)
    }
  }

  const { isAuthenticated, login } = useAuthContext()

  const HandleLogin = (usuario: string, senha: string) => {
    login(usuario, senha)
    handleButtonClick()
  }
  
  if (isAuthenticated) return <>{children}</>

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
          bgcolor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          position={"absolute"}
          alt="logo"
          src={Logo}
          component="img"
          sx={{ width: 80, height: 80, top: 5, right: 20 }}
        ></Box>
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
            autoComplete="off"
            type={"text"}
            label="Usuário"
            value={values.usuario}

            onKeyDown={ (e) => {
              if (e.key === "Enter"){
                HandleLogin(values.usuario, values.password)
              }}}
             
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
          <FormControl 
            sx={{ width: "100%", m: 1 }} 
            variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
              autoComplete="off"
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              onKeyDown={ (e) => {
                if (e.key === "Enter"){
                  HandleLogin(values.usuario, values.password)
                }}}
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
            onClick={() => HandleLogin(values.usuario, values.password)}
            disabled={loading}
            sx={{
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 500,
              height: 50,
              width: "60%",
              boxShadow: "none",
              borderRadius: 10,
              color: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="contained"
          >
            Login
            {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: '#E4DB00',
              }}
            />
          )}
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
