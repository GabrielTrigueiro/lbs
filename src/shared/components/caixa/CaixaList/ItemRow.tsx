import { IItemLista } from 'shared/models/caixa';
import CloseIcon from '@mui/icons-material/Close';
import { Item } from './CaixaListStyles';
import { useCaixaContext } from 'shared/contexts/CaixaContext';

interface ItemProps {
  item: IItemLista;
}
const ItemRow = ({ item }: ItemProps) => {
  const { removerItemLista } = useCaixaContext();
  if (!item.produto) return null;
  return (
    <Item>
      <div>{item.produto.name}</div>
      <div>{item.quantidade}</div>
      <div>{item.produto.description}</div>
      <div>{item.produto.salerPrice}</div>
      <div>{item.precoTotal}</div>
      <div
        onClick={() => removerItemLista(item.id)}
        className="
                  absolute 
                  right-2 
                  bottom-2
                  bg-red-500
                  rounded-md
                  text-white
                  hover:bg-opacity-80
                  cursor-pointer
                "
      >
        <CloseIcon />
      </div>
    </Item>
  );
};

export default ItemRow;
