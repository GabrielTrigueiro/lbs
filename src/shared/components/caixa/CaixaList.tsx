import { Typography, Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IItemLista } from 'shared/models/caixa';

interface ICaixaListProps {
  clear: () => void;
  rmvItem: (e: number) => void;
  lista: IItemLista[];
}

const CaixaList: React.FC<ICaixaListProps> = ({ clear, lista, rmvItem }) => {
  const [total, setTotal] = useState(0);

  const calcularSoma = useCallback(() => {
    return lista.reduce((soma, objeto) => soma + objeto.precoTotal, 0);
  }, [lista]);

  useEffect(() => {
    setTotal(calcularSoma);
  }, [lista, calcularSoma]);

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
          {lista.map(
            (item, index) =>
              item.produto && (
                //linha da tabela
                <div className="grid grid-cols-5 p-2 border-b-2 relative z-0">
                  <div>{item.produto.name}</div>
                  <div>{item.quantidade}</div>
                  <div>{item.produto.description}</div>
                  <div>{item.produto.salerPrice}</div>
                  <div>{item.precoTotal}</div>
                  <div
                    onClick={() => rmvItem(index)}
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
                </div>
              )
          )}
        </div>
      </div>

      {/* footer */}
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
        <Button
          disabled={lista.length === 0}
          onClick={clear}
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
          <Typography color={'#fff'}>Venda: {total}</Typography>
        </div>
      </div>
    </div>
  );
};

export default CaixaList;
