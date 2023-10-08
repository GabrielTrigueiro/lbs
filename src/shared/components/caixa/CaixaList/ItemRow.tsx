import { IItemLista } from 'shared/models/caixa';
import CloseIcon from '@mui/icons-material/Close';
import { Item } from './CaixaListStyles';
import { useCaixaContext } from 'shared/contexts/CaixaContext';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

interface ItemProps {
  item: IItemLista;
}

const Coluna = styled(Box)<{ valor?: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
`;

const ItemRow = ({ item }: ItemProps) => {
  const { removerItemLista } = useCaixaContext();
  if (!item.produto) return null;
  return (
    <Item>
      <Coluna>{item.produto.codeBarras}</Coluna>
      <Coluna>{item.produto.name}</Coluna>
      <Coluna>{item.quantidade}</Coluna>
      <Coluna>{item.produto.description}</Coluna>
      <Coluna>{item.produto.salerPrice}</Coluna>
      <Coluna>{item.precoTotal}</Coluna>
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
