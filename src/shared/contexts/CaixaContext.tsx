import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notification } from 'shared/components';
import jwtDecode from 'jwt-decode';
import { IDadosDaCompra, IItemLista, ILista } from 'shared/models/caixa';
import { CaixaService } from 'shared/services/api/caixa/Caixa_Service';

interface CaixaContextProps {
  produtosNaLista: ILista;
  ultimoProduto: IItemLista | undefined;
  setProdutoNaLista: React.Dispatch<React.SetStateAction<ILista>>;
  setUltimoProduto: React.Dispatch<
    React.SetStateAction<IItemLista | undefined>
  >;

  clientId: string;
  setClientId: React.Dispatch<React.SetStateAction<string>>;
  indicationId?: string;
  setIndicationId: React.Dispatch<React.SetStateAction<string>>;
  sellerId: string;
  setSellerId: React.Dispatch<React.SetStateAction<string>>;
  typePaymentId: string;
  setTypePaymentId: React.Dispatch<React.SetStateAction<string>>;
  valuePayment: number;
  setValuePayment: React.Dispatch<React.SetStateAction<number>>;
}

export const CaixaContext = createContext<CaixaContextProps | null>(null);
CaixaContext.displayName = 'Caixa';

export const useCaixaContext = () => {
  const {
    produtosNaLista,
    setProdutoNaLista,
    setUltimoProduto,
    ultimoProduto,
    clientId,
    sellerId,
    indicationId,
    typePaymentId,
    valuePayment,
    setClientId,
    setSellerId,
    setIndicationId,
    setTypePaymentId,
    setValuePayment,
  } = useContext(CaixaContext)!;

  const adicionarNaLista = useCallback(
    (novoProduto: IItemLista) => {
      if (
        produtosNaLista.produtos.find(
          (item) =>
            item.produto &&
            novoProduto.produto &&
            item.produto.id === novoProduto.produto.id
        )
      ) {
        setProdutoNaLista((prevState) => ({
          produtos: prevState.produtos.map((produto) => {
            if (
              produto.produto &&
              novoProduto.produto &&
              produto.produto.id === novoProduto.produto.id
            ) {
              return {
                ...produto,
                quantidade: produto.quantidade + novoProduto.quantidade,
              };
            }
            return produto;
          }),
        }));
        setUltimoProduto(novoProduto);
      }
      if (
        !produtosNaLista.produtos.find(
          (item) =>
            item.produto &&
            novoProduto.produto &&
            item.produto.id === novoProduto.produto.id
        )
      ) {
        setProdutoNaLista({
          produtos: [...produtosNaLista.produtos, novoProduto],
        });
        setUltimoProduto(novoProduto);
      }
    },
    [produtosNaLista, setProdutoNaLista, setUltimoProduto]
  );

  const removerItemLista = useCallback(
    (id: string) => {
      const indexId = produtosNaLista.produtos.findIndex(
        (objeto) => objeto.id === id
      );
      const updatedItems = [...produtosNaLista.produtos];
      updatedItems.splice(indexId, 1);
      setProdutoNaLista({ produtos: updatedItems });
      updatedItems.length === 0
        ? setUltimoProduto(undefined)
        : setUltimoProduto(
            produtosNaLista.produtos.at(produtosNaLista.produtos.length - 2)
          );
    },
    [produtosNaLista, setProdutoNaLista, setUltimoProduto]
  );

  const limparLista = useCallback(() => {
    setProdutoNaLista({ produtos: [] });
    setUltimoProduto(undefined);
    setValuePayment(0);
  }, [setProdutoNaLista, setUltimoProduto, setValuePayment]);

  const getBoxSaleId = () => {
    let tokenAtual: any = jwtDecode(localStorage.getItem('Acess_Token') || '');
    return tokenAtual.sub;
  };

  const finalizarCompra = useCallback(() => {
    const lista = produtosNaLista.produtos.map(
      (produto) =>
        produto.produto && {
          quantity: produto.quantidade,
          productId: produto.produto.id,
        }
    );
    let compra: IDadosDaCompra = {
      boxSaleId: getBoxSaleId(),
      products: lista,
      statusSeller: 'CONFIRMADO',
      clientId,
      valuePayment,
      sellerId,
      typePaymentId,
      indicationId,
    };
    console.log(compra);
    if (produtosNaLista.produtos.length === 0) {
      return Notification('Adicione ao menos um item.', 'error');
    }
    CaixaService.submitCompra(compra);
  }, [
    clientId,
    indicationId,
    produtosNaLista,
    sellerId,
    typePaymentId,
    valuePayment,
  ]);

  return {
    adicionarNaLista,
    removerItemLista,
    limparLista,
    finalizarCompra,
    produtosNaLista,
    ultimoProduto,
    clientId,
    sellerId,
    indicationId,
    typePaymentId,
    valuePayment,
    setClientId,
    setSellerId,
    setIndicationId,
    setTypePaymentId,
    setValuePayment,
  };
};

export const CaixaContextProvider: React.FC = ({ children }) => {
  const [produtosNaLista, setProdutoNaLista] = useState<ILista>({
    produtos: [],
  });
  const [ultimoProduto, setUltimoProduto] = useState<IItemLista>();
  const [clientId, setClientId] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [indicationId, setIndicationId] = useState('');
  const [typePaymentId, setTypePaymentId] = useState('');
  const [valuePayment, setValuePayment] = useState(0);

  return (
    <CaixaContext.Provider
      value={{
        produtosNaLista,
        ultimoProduto,
        clientId,
        sellerId,
        typePaymentId,
        valuePayment,
        indicationId,
        setProdutoNaLista,
        setUltimoProduto,
        setClientId,
        setIndicationId,
        setSellerId,
        setTypePaymentId,
        setValuePayment,
      }}
    >
      {children}
    </CaixaContext.Provider>
  );
};
