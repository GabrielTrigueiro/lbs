import React, { createContext, useContext, useState, useCallback } from 'react';
import { IItemLista } from 'shared/models/caixa';

interface CaixaContextProps {
  produtosNaLista: IItemLista[];
  ultimoProduto: IItemLista | undefined;
  setProdutoNaLista: React.Dispatch<React.SetStateAction<IItemLista[]>>;
  setUltimoProduto: React.Dispatch<
    React.SetStateAction<IItemLista | undefined>
  >;
}

export const CaixaContext = createContext<CaixaContextProps | null>(null);
CaixaContext.displayName = 'Caixa';

export const CaixaContextProvider: React.FC = ({ children }) => {
  const [produtosNaLista, setProdutoNaLista] = useState<IItemLista[]>([]);
  const [ultimoProduto, setUltimoProduto] = useState<IItemLista>();

  return (
    <CaixaContext.Provider
      value={{
        produtosNaLista,
        setProdutoNaLista,
        ultimoProduto,
        setUltimoProduto,
      }}
    >
      {children}
    </CaixaContext.Provider>
  );
};

export const useCaixaContext = () => {
  const {
    produtosNaLista,
    setProdutoNaLista,
    setUltimoProduto,
    ultimoProduto,
  } = useContext(CaixaContext)!;

  const adicionarNaLista = useCallback(
    (produto: IItemLista) => {
      setProdutoNaLista([...produtosNaLista, produto]);
      setUltimoProduto(produto);
    },
    [produtosNaLista, setProdutoNaLista, setUltimoProduto]
  );

  const removerItemLista = useCallback(
    (id: string) => {
      const indexId = produtosNaLista.findIndex((objeto) => objeto.id === id);
      const updatedItems = [...produtosNaLista];
      updatedItems.splice(indexId, 1);
      setProdutoNaLista(updatedItems);
      updatedItems.length === 0
        ? setUltimoProduto(undefined)
        : setUltimoProduto(produtosNaLista.at(produtosNaLista.length - 2));
    },
    [produtosNaLista, setProdutoNaLista, setUltimoProduto]
  );

  const limparLista = useCallback(() => {
    setProdutoNaLista([]);
    setUltimoProduto(undefined);
  }, [setProdutoNaLista, setUltimoProduto]);

  return {
    produtosNaLista,
    adicionarNaLista,
    removerItemLista,
    limparLista,
    ultimoProduto,
  };
};
