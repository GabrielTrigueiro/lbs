import { Typography, Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { IItemLista } from 'shared/models/caixa';
import {
  CabecalhoTabela,
  Container,
  CorpoTabela,
  FooterTabela,
  Tabela,
} from './CaixaListStyles';
import ItemRow from './ItemRow';

interface ICaixaListProps {
  clear: () => void;
  rmvItem: (e: string) => void;
  lista: IItemLista[];
}

const CaixaList: React.FC<ICaixaListProps> = ({ clear, lista, rmvItem }) => {
  const [total, setTotal] = useState(0);

  const calcularSoma = useCallback(() => {
    return lista.reduce((soma, objeto) => soma + objeto.precoTotal, 0);
  }, [lista]);

  useEffect(() => {
    setTotal(calcularSoma);
  }, [lista, calcularSoma]);

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
          {lista.map((item) => (
            <ItemRow item={item} removerItem={rmvItem} />
          ))}
        </CorpoTabela>
      </Tabela>

      <FooterTabela>
        <Button
          disabled={lista.length === 0}
          onClick={clear}
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
