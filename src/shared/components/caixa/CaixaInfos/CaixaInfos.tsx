import { Button, TextField } from '@mui/material';
import { ImagemProduto } from './CaixaInfosStyles';
import { useCaixaContext } from 'shared/contexts/CaixaContext';
import Info from './Info';

export default function CaixaInfos() {
  const { ultimoProduto } = useCaixaContext();
  return (
    <>
      <div className="bg-white flex flex-col items-center p-1">
        <ImagemProduto>imagem</ImagemProduto>
        <div className="w-full grid grid-cols-2 gap-2 p-3 mt-1">
          <Info label="Código" value={ultimoProduto?.produto?.codeBarras} />
          <Info label="Descrição" value={ultimoProduto?.produto?.description} />
          <Info
            label="Valor"
            Dinheiro
            value={ultimoProduto?.produto?.salerPrice}
          />
        </div>
      </div>
      <div className="bg-white flex gap-2 p-1">
        <TextField autoComplete="off" label="Indicações" variant="standard" />
        <TextField autoComplete="off" label="Cliente" variant="standard" />
        <TextField autoComplete="off" label="Vendedor" variant="standard" />
      </div>

      {/* pagamentos */}
      <div className="flex-grow grid grid-row-3">
        <div className="bg-neutral-500 text-white flex items-center px-2">
          Saldo a pagar: R$ 0,00
        </div>
        <div className="bg-white flex items-center justify-center">
          formas de pagamento
        </div>
        <div className="bg-neutral-500 text-white flex items-center px-2">
          Desconto: R$ % ####
        </div>
      </div>

      {/* finalizar */}
      <div className="bg-neutral-500 h-fit flex items-center justify-between p-2 text-white">
        Valor a ser pago: R$
        <Button variant="contained">Confirmar</Button>
      </div>
    </>
  );
}
