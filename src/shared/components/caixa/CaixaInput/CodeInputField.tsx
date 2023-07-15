import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCallback, useState } from 'react';
import { useCaixaContext } from 'shared/contexts/CaixaContext';
import { IItemLista } from 'shared/models/caixa';
import { v4 as uuid } from 'uuid';
import { IDataProduct } from '../../../models/product';
import { ProductService } from '../../../services/api/product';
import {
  BotaoQuantidade,
  CampoQuantidade,
  Container,
  CustomSelect,
  InputQuantidade,
} from './CaixaInputStyles';

const CodeInputField = () => {
  const [quantidade, setQuantidade] = useState<number>(0);
  const [codigo, setCodigo] = useState('');
  const [tempProduct, setTempProduct] = useState<IDataProduct>();
  const { adicionarNaLista } = useCaixaContext();

  const submitProduto = () => {
    if (tempProduct) {
      let estruturando: IItemLista = {
        id: uuid(),
        produto: tempProduct,
        precoTotal: quantidade * tempProduct.salerPrice,
        quantidade: quantidade,
      };
      adicionarNaLista(estruturando);
    }
    setTempProduct(undefined);
    setQuantidade(0);
    setCodigo('');
  };

  const quantidadeManual = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setQuantidade(Number(evento.target.value));
  };

  const adicionar = useCallback(() => {
    setQuantidade(quantidade + 1);
  }, [quantidade]);

  const remover = useCallback(() => {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
    }
  }, [quantidade]);

  const getOptions = useCallback(async () => {
    let search = {
      page: 0,
      pageSize: 5,
      param: 'name',
      sortDirection: 'DESC',
      sortField: 'name',
      value: codigo,
    };
    const resp = await ProductService.getAll(search);
    return resp.data;
  }, [codigo]);

  return (
    <Container>
      <CampoQuantidade>
        <BotaoQuantidade onClick={adicionar}>
          <AddIcon />
        </BotaoQuantidade>
        <InputQuantidade
          autoComplete="off"
          placeholder="Qtd"
          type="number"
          onChange={quantidadeManual}
          value={quantidade}
        />
        <BotaoQuantidade onClick={remover}>
          <RemoveIcon />
        </BotaoQuantidade>
      </CampoQuantidade>

      <div
        className="
          col-span-4
          flex
          relative
        "
      >
        <CustomSelect
          isClearable
          cacheOptions
          loadOptions={getOptions}
          formatOptionLabel={(option: any) => (
            <div
              onClick={() => {
                setTempProduct(option);
              }}
              className="flex flex-row items-center gap-3"
            >
              <div>Nome: {option.name}</div>
              <div>Descrição: {option.description}</div>
              <div>Preço: {option.salerPrice}</div>
            </div>
          )}
        />
      </div>
      {/* botão add */}
      <div className="col-span-1 flex">
        <button
          disabled={!tempProduct}
          className={`
            grow
            ${quantidade === 0 ? 'bg-neutral-300' : 'bg-yellow-300'}
            ${quantidade === 0 ? 'hover:bg-neutral-300' : 'hover:bg-yellow-200'}
          `}
          onClick={() => submitProduto()}
        >
          Adicionar
        </button>
      </div>
    </Container>
  );
};

export default CodeInputField;
