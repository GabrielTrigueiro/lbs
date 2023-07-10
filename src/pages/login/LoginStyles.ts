import styled from "@emotion/styled";
import { Button, FormControl, Grid } from "@mui/material";
import { amareloClaroDefault, amareloDefault, fundoBranco } from "styles/variables";
import mulher from 'images/login/Mulher.jpg';
import logo from 'images/login/logo.svg';

export const GridContainer = styled(Grid)`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

export const Mulher = styled.img`
  flex: 2;
  background-image: url(${mulher});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
`;

export const LoginContainer = styled(Grid)`
  flex: 1;
  background-color: ${fundoBranco};
  text-align: center;
  display: flex;

  h2 {
    font-weight: bold;
    font-size: 2.5pc;
  }
`;

export const Formulario = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0em 4em;
`;

export const FormularioContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CustomFormControl = styled(FormControl)`
  width: 100%;
  margin: 0.5em !important;
`;

export const Logo = styled.div`
  height: 4pc;
  width: 4pc;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  border: transparent;
  right: 0;
  top: 0;
`;

export const CustomButton = styled(Button)`
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


