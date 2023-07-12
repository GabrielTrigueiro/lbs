import styled from "@emotion/styled";

export const CaixaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding-top: 1rem;
  padding-bottom: 1rem;
  gap: 1.25rem;
  height: 100%;
`;

export const ListaContainer = styled.div`
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const InfosContainer = styled.div`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
