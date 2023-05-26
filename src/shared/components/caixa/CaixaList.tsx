import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import { IItemLista } from "../../../pages/caixa";

interface ICaixaListProps {
  clear: () => void;
  lista: IItemLista[];
}

const CaixaList: React.FC<ICaixaListProps> = ({ clear, lista }) => {

  

  return (
    <div
      className="
        grow
        flex
        flex-col
        flex-none
      "
    >
      <div
        className="
          bg-white
          grow
          h-[70vh]
          overflow-y-auto
          flex
          flex-col
        "
      >
        {/* header da tabela */}
        <div
          className="
            grid
            grid-cols-5
            p-2
            border-b-2
          "
        >
          <div>Nome</div>
          <div>Quantidade</div>
          <div>Descrição</div>
          <div>Valor unitário</div>
          <div>Valor total</div>
        </div>
        {/* body da tabela */}
        <div
          className="
            flex-grow
            overflow-auto
          "
        >
          {lista.map((item) => (
            item.produto &&
            <div className="grid grid-cols-5 p-2 border-b-2">
              <div>{item.produto.name}</div>
              <div>{item.quantidade}</div>
              <div>{item.produto.description}</div>
              <div>{item.produto.salerPrice}</div>
              <div>{item.precoTotal}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="
          bg-neutral-500
           flex
           h-16
           text-black
           items-center
           px-2
           rounded-b-lg
          "
      >
        <Button disabled={lista.length === 0} onClick={clear} sx={{ height: "80%" }} variant="contained">Cancelar</Button>
        <div
          className="
            flex
            flex-grow 
            justify-end 
            items-center
          "
        >
          <Typography color={"#fff"}>Venda: { }</Typography>
        </div>
      </div>
    </div>
  )
}

export default CaixaList;