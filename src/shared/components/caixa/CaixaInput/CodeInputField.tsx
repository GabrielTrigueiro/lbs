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
  InputQuantidade,
} from './CaixaInputStyles';
import {
  Autocomplete,
  TextField,
  Box,
  CircularProgress,
  Typography,
  Divider,
  Button,
} from '@mui/material';

const CodeInputField = () => {
  const { adicionarNaLista } = useCaixaContext();
  const [codigo, setCodigo] = useState('');
  const [listaDeProdutos, setListaDeProdutos] = useState<IDataProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tempProduct, setTempProduct] = useState<IDataProduct | null>(null);
  const [quantidade, setQuantidade] = useState<string>('0');

  const submitProduto = (enter: boolean) => {
    let produtoToSubmit = enter ? listaDeProdutos.at(0) : tempProduct;
    if (produtoToSubmit) {
      let estruturando: IItemLista = {
        id: uuid(),
        produto: produtoToSubmit,
        precoTotal:
          Number(quantidade === '' || '0' ? '1' : quantidade) *
          produtoToSubmit.salerPrice,
        quantidade: quantidade === '0' ? '1' : quantidade,
      };
      adicionarNaLista(estruturando);
    }
    setTempProduct(null);
    setQuantidade('0');
    setCodigo('');
  };

  const lerSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCodigo(event.target.value);
  };

  //seta o produto temporário e se qtd for 0 add 1
  const clicarNaOpcao = useCallback(
    (produtoSelecionado: IDataProduct | null) => {
      if (quantidade === '0' || '') {
        adicionar();
      }
      setTempProduct(produtoSelecionado);
    },
    [quantidade, tempProduct, setQuantidade, setTempProduct]
  );

  const enterToSubmit = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      submitProduto(true);
    }
  };

  const quantidadeManual = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setQuantidade(evento.target.value);
  };

  const adicionar = useCallback(() => {
    setQuantidade(String(Number(quantidade) + 1));
  }, [quantidade]);

  const remover = useCallback(() => {
    if (Number(quantidade) > 0) {
      setQuantidade(String(Number(quantidade) - 1));
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
          filterOptions={(x) => x}
          noOptionsText="Nenhum produto encontrado"
          fullWidth
          value={tempProduct}
          options={listaDeProdutos}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => clicarNaOpcao(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyPress={enterToSubmit}
              label="Digite algo"
              variant="outlined"
              fullWidth
              onChange={lerSearch}
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
            <Box
              key={uuid()}
              component="li"
              {...props}
              sx={{
                display: 'flex',
                width: '100%',
                gap: 1,
                padding: 1,
                ':hover': { background: '#f3f3f3' },
                cursor: 'pointer',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography sx={{ fontWeight: 'bold', minWidth: 100 }}>
                  Código:
                </Typography>
                <Typography sx={{ width: 150, textAlign: 'start' }}>
                  {option.codeBarras}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography sx={{ fontWeight: 'bold', minWidth: 100 }}>
                  Nome:
                </Typography>
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    width: 150,
                    textAlign: 'start',
                  }}
                >
                  {option.name}
                </Typography>
              </Box>
            </Box>
          )}
        />
      </div>
      {/* botão add */}
      <Button
        disabled={quantidade === '0' || tempProduct == null}
        onClick={() => submitProduto(false)}
        variant="contained"
      >
        Adicionar
      </Button>
    </Container>
  );
};

export default CodeInputField;
