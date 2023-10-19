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
import useDialogConfirmation from 'shared/hooks/dialogs/DialogConfirmation';
import GenericDialog from 'shared/components/modal/Dialog/Dialog';
import useDialogClearList from 'shared/hooks/dialogs/DialogClearList';

export const transformNumberToBr = (numero: number | string): string => {
  // Converte para um número, se for uma string
  const num = typeof numero === 'string' ? parseFloat(numero) : numero;

  if (isNaN(num)) {
    // Lidar com casos inválidos
    return 'Número inválido';
  }

  return num.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const CaixaList = () => {
  const [total, setTotal] = useState(0);
  const { produtosNaLista, limparLista, setValorDaLista } = useCaixaContext();
  const { isOpenDialog, onCloseDialog, onOpenDialog } = useDialogClearList();

  const calcularSoma = useCallback(() => {
    return produtosNaLista.produtos.reduce(
      (soma, objeto) => soma + objeto.precoTotal,
      0
    );
  }, [produtosNaLista]);

  useEffect(() => {
    let soma = calcularSoma;
    setTotal(soma);
    setValorDaLista(soma);
  }, [produtosNaLista, calcularSoma, setValorDaLista]);

  return (
    <Container>
      <Tabela>
        <CabecalhoTabela>
          <h1>Cod. Barras</h1>
          <h1>Nome</h1>
          <h1>Qtd.</h1>
          <h1>Descrição</h1>
          <h1>Valor unit.</h1>
          <h1>Valor total</h1>
        </CabecalhoTabela>
        <CorpoTabela>
          {produtosNaLista.produtos.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </CorpoTabela>
      </Tabela>

      <FooterTabela>
        <Button
          disabled={produtosNaLista.produtos.length === 0}
          onClick={onOpenDialog}
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
          <Typography color={'#fff'}>
            Venda: R$ {transformNumberToBr(total)}
          </Typography>
        </div>
      </FooterTabela>
      <GenericDialog
        isOpenDialog={isOpenDialog}
        onCloseDialog={onCloseDialog}
        title="Limpar lista?"
        confirmAction={limparLista}
      />
    </Container>
  );
};

export default CaixaList;
