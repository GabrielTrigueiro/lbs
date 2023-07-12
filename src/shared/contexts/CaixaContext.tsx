import React, { createContext, useContext, useState, useCallback } from 'react';
import { IItemLista } from 'shared/models/caixa';

interface CaixaContextProps {
  produtosNaLista: IItemLista[];
  setProdutoNaLista: React.Dispatch<React.SetStateAction<IItemLista[]>>;
}

export const CaixaContext = createContext<CaixaContextProps | null>(null);

export const CaixaContextProvider: React.FC = ({ children }) => {
  const [produtosNaLista, setProdutoNaLista] = useState<IItemLista[]>([]);

  return (
    <CaixaContext.Provider value={{ produtosNaLista, setProdutoNaLista }}>
      {children}
    </CaixaContext.Provider>
  );
};

export const useCaixaContext = () => {
  const { produtosNaLista, setProdutoNaLista } = useContext(CaixaContext)!;

  const adicionarNaLista = useCallback(
    (produto: IItemLista) => {
      setProdutoNaLista([...produtosNaLista, produto]);
    },
    [produtosNaLista, setProdutoNaLista]
  );

  const removerItemLista = useCallback(
    (index: string) => {
      const updatedItems = [...produtosNaLista];
      updatedItems.splice(Number(index), 1);
      setProdutoNaLista(updatedItems);
    },
    [produtosNaLista, setProdutoNaLista]
  );

  const limparLista = useCallback(() => {
    setProdutoNaLista([]);
  }, [setProdutoNaLista]);

  return {
    produtosNaLista,
    adicionarNaLista,
    removerItemLista,
    limparLista,
  };
};
