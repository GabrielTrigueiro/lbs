import styled from '@emotion/styled';

export const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  flex: none;
`;

export const Tabela = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: white;
  height: 70vh;
`;

export const CabecalhoTabela = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  padding: 0.5rem;
  border-bottom-width: 2px;
`;

export const CorpoTabela = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  padding: 0.5rem;
  border-bottom-width: 2px;
  position: relative;
  z-index: 0;
`;

export const FooterTabela = styled.div`
  --tw-bg-opacity: 1;
  background-color: rgb(115 115 115 / var(--tw-bg-opacity));
  display: flex;
  height: 4rem;
  color: #000;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
`