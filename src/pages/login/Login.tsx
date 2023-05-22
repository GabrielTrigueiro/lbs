import Typography from "@mui/material/Typography"
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
import {useCallback} from 'react';
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
import { Notification } from "../../shared/components"
import { ILogin } from "../../shared/models/user"
import { AuthService } from "../../shared/services/api/auth/AuthService"
import { useNavigate } from "react-router"
import { useAuthContext } from "../../shared/contexts/AuthContext"

export const Login: React.FC = () => {

  const {login} = useAuthContext();
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const [values, setValues] = useState({
    password: "",
    username: "",
    showPassword: false,
  })

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  
  const handleChange = (prop: keyof ILogin) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
  }
  
  return (
    <Grid className={styles.container}>
      <div className={styles.imagem}/>
      <Grid className={styles.container_formulario}>
        <div className={styles.logo}/>
        <Box className={styles.formulario}>
          <Typography className={styles.titulo}>Login</Typography>
          <Form ref={formRef} onSubmit={async (dados) => login(dados)} className={styles.login}>
            <FormControl className={styles.login_input}  id="outlined-start-adornment">
              <InputLabel htmlFor="outlined-adornment-user">
                Usuario
              </InputLabel>
              <VLoginOutlinedInput
                name="username"
                autoComplete="off"
                type={"text"}
                label="Usuário"
                value={values.username}
                onChange={handleChange("username")}
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
              <CircularProgress className={styles.well}size={24}/>
            )}
            </Button>
          </Form>
        </Box>
      </Grid>
    </Grid>
  )
}
