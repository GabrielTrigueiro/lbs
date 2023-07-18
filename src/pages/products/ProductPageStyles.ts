import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Cabecalho = styled.header``;
export const Tabela = styled.div`
  flex-grow: 1;
  max-height: 70vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
`;
export const Footer = styled.footer`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
