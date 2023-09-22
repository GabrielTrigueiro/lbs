import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCallback, useEffect, useState } from 'react';
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
import { Autocomplete, TextField, Box, CircularProgress } from '@mui/material';

const CodeInputField = () => {
  const { adicionarNaLista } = useCaixaContext();
  const [codigo, setCodigo] = useState('');
  const [listaDeProdutos, setListaDeProdutos] = useState<IDataProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tempProduct, setTempProduct] = useState<IDataProduct | null>(null);
  const [quantidade, setQuantidade] = useState<number>(0);

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
    setTempProduct(null);
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

  useEffect(() => {
    let active = true;
    let search = {
      page: 0,
      pageSize: 5,
      param: 'name',
      sortDirection: 'DESC',
      sortField: 'name',
      value: codigo,
    };

    if (codigo === '') {
      setListaDeProdutos([]);
      return undefined;
    }

    setLoading(true);

    ProductService.getAll(search).then((response) => {
      if (active) {
        setListaDeProdutos(response.data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
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
        <Autocomplete
          fullWidth
          value={tempProduct}
          options={listaDeProdutos}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => {
            setTempProduct(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Digite algo"
              variant="outlined"
              fullWidth
              onChange={(event) => setCodigo(event.target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <span style={{ fontWeight: 'bold', marginRight: 5 }}>
                Código:{' '}
              </span>{' '}
              {option.codeBarras}{' '}
              <span style={{ fontWeight: 'bold', marginRight: 5 }}>Nome: </span>{' '}
              {option.name}
            </Box>
          )}
        />
      </div>
      {/* botão add */}
      <div className="col-span-1 flex">
        <button
          disabled={quantidade == 0}
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
