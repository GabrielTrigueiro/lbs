import Typography from "@mui/material/Typography"
import { useAuthContext } from "../../shared/contexts"
import { useContext, useEffect, useRef, useState } from "react"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LockIcon from "@mui/icons-material/Lock"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import { VLoginOutlinedInput } from "../../shared/forms"
import { Form } from "@unform/web"
import styles from "../../styles/Login/Login.module.scss"
import * as Yup from "yup";
import { FormHandles } from "@unform/core"
import { SnackbarContext, Snack } from "../../shared/contexts/NotificationContext"
import { Navigate } from "react-router-dom";
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

interface State {
  password: string
  usuario: string
}

export const Login: React.FC = () => {

  const timer = useRef<number>()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { isAuthenticated, login } = useAuthContext()
  const {setSnack} = useContext(SnackbarContext);
  const [values, setValues] = useState({
    password: "",
    usuario: "",
    showPassword: false,
  })

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
  
  const handleChange = (prop: keyof State) => (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const formRef = useRef<FormHandles>(null);

  const schema: Yup.SchemaOf<State> = Yup.object().shape({
    usuario:
  Yup.string()
      .required("Usuário obrigatório")
      .min(6, "Usuário mínimo 6 digitos"),
    password:
  Yup.string()
      .required("Senha obrigatória")
      .min(4, "Senha mínimo 4 digitos")
});
  
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
  
  const HandleLogin = (dados: State) => {
    schema
        .validate(dados, { abortEarly: false })
        .then((dadosValidados) => {
            login(dadosValidados.usuario, dadosValidados.password);
            handleButtonClick();
        })
        .catch((erros: Yup.ValidationError) => {
            const validandoErros: { [key: string]: string } = {};
            erros.inner.forEach((erros) => {
                if (!erros.path) return;
                validandoErros[erros.path] = erros.message;
                // Notification(erros.message, "error");
            });
            formRef.current?.setErrors(validandoErros);
        });
};

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])
  
  if (isAuthenticated) return <Navigate replace to="/home/clientes"/>
  return (
    <Grid className={styles.container}>
      <image className={styles.imagem}/>
      <Grid className={styles.container_formulario}>
        <image className={styles.logo}/>
        <Box className={styles.formulario}>
          <Typography className={styles.titulo}>Login</Typography>
          <Form ref={formRef} onSubmit={(dados) => HandleLogin(dados)} className={styles.login}>
            <FormControl className={styles.login_input}  id="outlined-start-adornment">
              <InputLabel htmlFor="outlined-adornment-user">
                Usuario
              </InputLabel>
              <VLoginOutlinedInput
                name="usuario"
                autoComplete="off"
                type={"text"}
                label="Usuário"
                value={values.usuario}
                onChange={handleChange("usuario")}
                startAdornment = {
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                }
              />
              </FormControl>
            
            <FormControl className={styles.login_input} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Senha
              </InputLabel>
              <VLoginOutlinedInput
                name="password"
                autoComplete="off"
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
                      {
                        values.showPassword ? 
                        <VisibilityOff /> : <Visibility />
                      }
                    </IconButton>
                  </InputAdornment>
                }
                label="Senha"
              />
            </FormControl>

            <Button className={styles.botao} type="submit" disabled={loading} variant="contained">
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
