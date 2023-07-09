import styled from '@emotion/styled';
import { useState, useCallback } from 'react';
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Button,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Form } from '@unform/web';
import { PuffLoader } from 'react-spinners';

import mulher from 'images/login/Mulher.jpg';
import { useAuthContext } from 'shared/contexts/AuthContext';
import 'styles/GlobalVariables.module.scss';
import {
  amareloDefault,
  fundoBranco,
  amareloClaroDefault,
} from 'styles/variables';
import { ILogin } from 'shared/models/user';
import { CustomInput } from 'shared/forms/forms-components/CustomImput';

const GridContainer = styled(Grid)`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const Mulher = styled.img`
  flex: 2;
  background-image: url(${mulher});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
`;

const LoginContainer = styled(Grid)`
  flex: 1;
  background-color: ${fundoBranco};
  text-align: center;
  display: flex;

  h2 {
    font-weight: bold;
    font-size: 2.5pc;
  }
`;

const Formulario = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0em 4em;
`;

const FormularioContainer = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CustomFormControl = styled(FormControl)`
  width: 100%;
  margin: 0.5em !important;
`;

const CustomButton = styled(Button)`
  position: relative;
  margin-top: 1em !important;
  width: 50% !important;
  height: 50px !important;
  border-radius: 10px !important;
  font-size: $normal !important;
  box-shadow: none !important;
  background-color: ${amareloDefault} !important;

  :hover {
    background-color: ${amareloClaroDefault} !important;
    box-shadow: none;
  }
`;
//----------------------------------------------
export const Login: React.FC = () => {
  const { login } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    password: '',
    username: '',
    showPassword: true,
  });

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

  const handleChange =
    (prop: keyof ILogin) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
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

  return (
    <GridContainer>
      <Mulher />
      <LoginContainer>
        <Formulario>
          <h2>Login</h2>
          <FormularioContainer onSubmit={async (dados) => handleLogin(dados)}>
            <CustomFormControl id="outlined-start-adornment">
              <InputLabel htmlFor="outlined-adornment-user">Usuario</InputLabel>
              <CustomInput
                name="username"
                autoComplete="off"
                type={'text'}
                label="Usuário"
                value={values.username}
                onChange={handleChange('username')}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                }
              />
            </CustomFormControl>
            <CustomFormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Senha
              </InputLabel>
              <CustomInput
                name="password"
                autoComplete="off"
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
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
                      {values.showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Senha"
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
