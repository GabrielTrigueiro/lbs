import { useCallback, useState, useEffect } from 'react';
import { PuffLoader } from 'react-spinners';
import { useAuthContext } from 'shared/contexts/AuthContext';
import 'styles/GlobalVariables.module.scss';
import loginValidationSchema from './LoginValidation';
import {
  CustomButton,
  CustomFormControl,
  Formulario,
  FormularioContainer,
  GridContainer,
  LoginContainer,
  Logo,
  Mulher,
} from './LoginStyles';
import { useFormik } from 'formik';
import { InputAdornment, IconButton, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //form
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = useCallback(
    async (data: any) => {
      setIsLoading(true);
      await login(data)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    },
    [login]
  );

  useEffect(() => {
    if (isAuthenticated) navigate('/clientes');
  }, [navigate, isAuthenticated]);

  return (
    <GridContainer>
      <Logo />
      <Mulher />
      <LoginContainer>
        <Formulario>
          <h2>Login</h2>
          <FormularioContainer onSubmit={formik.handleSubmit}>
            <CustomFormControl>
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                autoComplete="off"
                fullWidth
                id="username"
                name="username"
                label="Usuário"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </CustomFormControl>
            <CustomFormControl>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="off"
                fullWidth
                id="password"
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </CustomFormControl>
            <CustomButton
              type="submit"
              disabled={isLoading}
              variant="contained"
            >
              Login
              <PuffLoader
                style={{ position: 'absolute', right: '50px', bottom: '40px' }}
                size={30}
                color="#000"
                loading={isLoading}
              />
            </CustomButton>
          </FormularioContainer>
        </Formulario>
      </LoginContainer>
    </GridContainer>
  );
};
