import styled from '@emotion/styled';
import { Card } from '@mui/material';
import { Box } from '@mui/system';

export const CardForm = styled(Card)`
  padding: 1em;
  display: 'flex';
  flex-direction: 'column';
  position: relative;
`;

export const RegisterContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AboutForm = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const AboutFields = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ValueForm = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ValueFields = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const FormularioRegistro = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
`;
