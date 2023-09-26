import styled from '@emotion/styled';
import { amareloDefault } from 'styles/variables';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

export const Container = styled.div`
  flex-grow: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  position: relative;
  gap: 0.3rem;
`;

export const CampoQuantidade = styled.div`
  /* background-color: rgb(115 115 115); */
  color: rgb(255 255 255);
  grid-column: span 1;
  max-width: span 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const InputQuantidade = styled.input`
  width: 3rem;
  border-radius: 0.125rem;
  text-align: center;
  color: rgb(0 0 0);
  outline: 2px solid transparent;
  outline-offset: 2px;
  padding: 0.25rem;
`;

export const BotaoQuantidade = styled.div`
  cursor: pointer;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.2em;
  background-color: rgb(115 115 115);
  :hover {
    background-color: ${amareloDefault};
  }
`;

export const CustomSelect = styled(AsyncSelect)`
  flex-grow: 1;
  margin-top: auto;
  margin-bottom: auto;
`;

export const CustomSelectSimples = styled(Select)`
  flex-grow: 1;
  margin-top: auto;
  margin-bottom: auto;
`;
