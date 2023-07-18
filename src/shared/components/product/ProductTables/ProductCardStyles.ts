import styled from '@emotion/styled';
import { fundoCinza } from 'styles/variables';

export const Imagem = styled.div`
  background-color: ${fundoCinza};
  height: 50%;
  width: 100%;
  border-radius: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Nome = styled.div`
  text-align: center;
  margin-top: 0.5em;
`;

export const Infos = styled.div`
  display: flex;
  margin-top: 1em;
  flex-direction: row;
  font-size: 0.8em;
  justify-content: space-between;
  align-items: center;
`;
