import { Button, TextField } from "@mui/material";
import CodeImputField from "../../shared/components/caixa/CodeImputField";
import { useCallback, useEffect, useState } from "react";
import CaixaList from "../../shared/components/caixa/CaixaList";
import { IDataProduct } from "../../shared/models/product";

export interface IItem {
  code: string;
  quantidade: number;
}

export interface IItemLista {
  produto?: IDataProduct;
  quantidade?: number;
  precoTotal: number;
}

export const CaixaPage = () => {

  const [teste, setTeste] = useState<IItem[]>([]);
  const [lista, setLista] = useState<IItemLista[]>([])

  const addToList = useCallback((produto: IItemLista) => {
    setLista([...lista, produto])
  }, [lista])
 
  const rmvItem = useCallback((id: string) => {
    let filtrado = teste.filter((item) => item.code !== id)
    setTeste(filtrado)
  }, [teste])

  const clearList = useCallback(() => {
    setLista([])
  }, [])

  useEffect(() => {
    console.log(lista)
  }, [lista])

  return (
    <div
      className="
          grid
          grid-cols-4
          py-4
          gap-5
          h-full
      "
    >
      {/* lista */}
      <div
        className="
          col-span-3
          flex
          flex-col
          gap-3
        "
      >
          <CodeImputField add={addToList}/>
          <CaixaList clear={clearList} lista={lista}/>
      </div>

      {/* infos */}
      <div className="cols-span-1 flex flex-col gap-3">

        {/* infos */}
        <div className="bg-white flex flex-col items-center p-1">
          <div className="bg-gray-500 w-[180px] h-[180px] flex-none flex items-center justify-center">
            imagem
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            <TextField autoComplete="off" label="Código" variant="standard" />
            <TextField autoComplete="off" label="Descrição" variant="standard" />
            <TextField autoComplete="off" label="Preço" variant="standard" />
            <TextField autoComplete="off" label="Cor" variant="standard" />
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
            Desconto: R$    %     ####
          </div>
        </div>

        {/* finalizar */}
        <div className="bg-neutral-500 h-fit flex items-center justify-between p-2 text-white">
          Valor a ser pago: R$
          <Button variant="contained">Confirmar</Button>
        </div>
      </div>
    </div>
  )
}