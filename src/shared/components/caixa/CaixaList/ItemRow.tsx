import { IItemLista } from 'shared/models/caixa';
import CloseIcon from '@mui/icons-material/Close';
import { Item } from './CaixaListStyles';
import { useCaixaContext } from 'shared/contexts/CaixaContext';
import { Box, TextField } from '@mui/material';
import { transformNumberToBr } from './CaixaList';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { InputQuantidade } from '../CaixaInput/CaixaInputStyles';

interface ItemProps {
  item: IItemLista;
}

const Coluna = styled(Box)<{ valor?: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemRow = ({ item }: ItemProps) => {
  const { removerItemLista, mudarQuantidadeManualmenteNaCelula } =
    useCaixaContext();

  function analisarEntrada(entrada: string): number {
    if (entrada === '') {
      return 0;
    } else {
      return Number(entrada);
    }
  }

  const capturarQuantidade = useCallback(
    (evento: React.ChangeEvent<HTMLInputElement>) => {
      mudarQuantidadeManualmenteNaCelula(
        item,
        analisarEntrada(evento.target.value)
      );
    },
    []
  );

  if (!item.produto) return null;
  return (
    <Item>
      <Coluna>{item.produto.codeBarras}</Coluna>
      <Coluna>{item.produto.name}</Coluna>
      <Coluna>
        <InputQuantidade
          autoComplete="off"
          type="number"
          onChange={capturarQuantidade}
          value={item.quantidade}
        />
      </Coluna>
      <Coluna>{item.produto.description}</Coluna>
      <Coluna>R$ {transformNumberToBr(item.produto.salerPrice)}</Coluna>
      <Coluna>R$ {transformNumberToBr(item.precoTotal)}</Coluna>
      <Coluna
        onClick={() => removerItemLista(item.id)}
        className="
          absolute  
          right-2 
          bottom-2
          text-black
          cursor-pointer
        "
      >
        <CloseIcon />
      </Coluna>
    </Item>
  );
};

export default ItemRow;
