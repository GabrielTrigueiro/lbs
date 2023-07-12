import { Typography, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import {
  CabecalhoTabela,
  Container,
  CorpoTabela,
  FooterTabela,
  Tabela,
} from './CaixaListStyles';
import ItemRow from './ItemRow';
import { useCaixaContext } from 'shared/contexts/CaixaContext';

const CaixaList = () => {
  const [total, setTotal] = useState(0);
  const { produtosNaLista, limparLista } = useCaixaContext();

  const calcularSoma = useCallback(() => {
    return produtosNaLista.reduce(
      (soma, objeto) => soma + objeto.precoTotal,
      0
    );
  }, [produtosNaLista]);

  useEffect(() => {
    setTotal(calcularSoma);
  }, [produtosNaLista, calcularSoma]);

  return (
    <Container>
      <Tabela>
        <CabecalhoTabela>
          <h1>Nome</h1>
          <h1>Quantidade</h1>
          <h1>Descrição</h1>
          <h1>Valor unitário</h1>
          <h1>Valor total</h1>
        </CabecalhoTabela>
        <CorpoTabela>
          {produtosNaLista.map((item) => (
            <ItemRow item={item} />
          ))}
        </CorpoTabela>
      </Tabela>

      <FooterTabela>
        <Button
          disabled={produtosNaLista.length === 0}
          onClick={limparLista}
          sx={{ height: '80%' }}
          variant="contained"
        >
          Cancelar
        </Button>
        <div
          className="
            flex
            flex-grow 
            justify-end 
            items-center
          "
        >
          <Typography color={'#fff'}>Venda: {total}</Typography>
        </div>
      </FooterTabela>
    </Container>
  );
};

export default CaixaList;
