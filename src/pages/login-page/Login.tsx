import Typography from "@mui/material/Typography"
import { useAuthContext } from "../../shared/contexts"
import { useContext, useEffect, useRef, useState } from "react"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LockIcon from "@mui/icons-material/Lock"
import Mulher from "../../images/login/Mulher.jpg"
import Logo from "../../images/login/logo.svg"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import {
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Box,
  Button,
  Grid,
  TextField,
} from "@mui/material"
import { VLoginOutlinedInput } from "../../shared/forms"
import { Form } from "@unform/web"
import "./styles.css"
import * as Yup from "yup";
import { FormHandles } from "@unform/core"
import { SnackbarContext, Snack } from "../../shared/contexts/NotificationContext"

interface State {
  password: string
  usuario: string
}

export const Login: React.FC = ({ children }) => {

  // const handleClickShowPassword = () => {
  //   setValues({
  //     ...values,
  //     showPassword: !values.showPassword,
  //   })
  // }
  // // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault()
  // }

  const [values, setValues] = useState({
    password: "",
    usuario: "",
  })
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
  }

  const formRef = useRef<FormHandles>(null);

  const schema: Yup.SchemaOf<State> = Yup.object().shape({
    usuario: Yup.string().required('Campo obrigatório').min(6,'Mínimo 6 digitos'),
    password: Yup.string().required('Campo obrigatório').min(4,'Mínimo 4 digitos')
  })

  //login loading------------------------------
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
  //login loading------------------------------

  const { isAuthenticated, login } = useAuthContext()

  const {snack, setSnack} = useContext(SnackbarContext);

  const HandleLogin = (dados: State) => {
    schema
    .validate(dados, { abortEarly: false })
    .then((dadosValidados) => {
      login(dados.usuario, dados.password)
      handleButtonClick()

    })
    .catch((erros: Yup.ValidationError) => {
      setSnack(new Snack({message: 'Quantidade mínima de digitos não respeitada', color:'error', open: true}))
      const validandoErros: { [key: string]: string } = {};
      erros.inner.forEach((erros) => {
        if (!erros.path) return;
        validandoErros[erros.path] = erros.message;
      });
      formRef.current?.setErrors(validandoErros);
    });
  }
  
  if (isAuthenticated) return<>{children}</>
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

          <Form
            ref={formRef}
            onSubmit={(dados) => HandleLogin(dados)}
            className="form-login"
          >
            <FormControl
              id="outlined-start-adornment"
              sx={{ width: "100%", m: 1 }}
            >
              <InputLabel htmlFor="outlined-adornment-user">Usuario</InputLabel>
              <VLoginOutlinedInput
                name="usuario"
                autoComplete="off"
                type={"text"}
                label="Usuário"
                value={values.usuario}
                // onKeyDown={ (e) => {
                //   if (e.key === "Enter"){
                //     HandleLogin(values.usuario, values.password)
                // }}}
                onChange={handleChange("usuario")}
                startAdornment = {
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                }
              />
              </FormControl>
            
            <FormControl 
              sx={{ width: "100%", m: 1 }} 
              variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
              <VLoginOutlinedInput
                name="password"
                autoComplete="off"
                id="outlined-adornment-password"
                // type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                // onKeyDown={ (e) => {
                //   if (e.key === "Enter"){
                //     HandleLogin(values.usuario, values.password)
                //   }}}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    {/* <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton> */}
                  </InputAdornment>
                }
                label="Senha"
              />
            </FormControl>

            <Button
              type="submit"
              disabled={loading}
              sx={{
                mt:1,
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
          </Form>
        </Box>
      </Grid>
    </Grid>
  )
}
