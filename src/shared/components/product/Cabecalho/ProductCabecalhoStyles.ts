import styled from '@emotion/styled';
import {
  amareloDefault,
  cinzaClaro,
  cinzaEscuro,
  grande,
} from 'styles/variables';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Titulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${grande};
  color: ${cinzaEscuro};
  font-weight: 600;
`;

export const CorpoCabecalho = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid ${cinzaClaro};
`;

export const ItemCabecalho = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: -2px;
  border-bottom: 4px solid ${amareloDefault};
`;

export const Info = styled.div`
  display: flex;
`;
