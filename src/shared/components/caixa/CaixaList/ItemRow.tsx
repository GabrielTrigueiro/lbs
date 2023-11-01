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

  const capturarQuantidade = useCallback(
    (evento: React.ChangeEvent<HTMLInputElement>) => {
      mudarQuantidadeManualmenteNaCelula(item, evento.target.value);
    },
    [item, mudarQuantidadeManualmenteNaCelula]
  );

  const handleBlur = () => {
    if (item.quantidade === '0') {
      mudarQuantidadeManualmenteNaCelula(item, '0');
    }
  };

  if (!item.produto) return null;
  return (
    <Item>
      <Coluna>{item.produto.codeBarras}</Coluna>
      <Coluna>{item.produto.name}</Coluna>
      <Coluna>
        <InputQuantidade
          autoComplete="off"
          onChange={capturarQuantidade}
          value={item.quantidade}
        />
      </Coluna>
      <Coluna>{item.produto.description}</Coluna>
      <Coluna>R$ {transformNumberToBr(item.produto.salerPrice)}</Coluna>
      <Coluna>R$ {transformNumberToBr(item.precoTotal)}</Coluna>
      <Coluna
        sx={{
          right: '0.5em',
          position: 'absolute',
          color: 'black',
          cursor: 'pointer',
        }}
        onClick={() => removerItemLista(item.id)}
      >
        <CloseIcon />
      </Coluna>
    </Item>
  );
};

export default ItemRow;
