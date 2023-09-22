import React, {createContext, useContext, useState, useCallback} from 'react';
import {Notification} from 'shared/components';
import jwtDecode from 'jwt-decode';
import {IDadosDaCompra, IItemLista, ILista} from 'shared/models/caixa';
import {CaixaService} from 'shared/services/api/caixa/Caixa_Service';
import {IInfoClient} from "../models/client";
import {dataOneIndication} from "../models/indication";
import {IColab} from "../models/colab";
import {Payment} from "../models/payment";

interface CaixaContextProps {
  produtosNaLista: ILista;
  ultimoProduto: IItemLista | undefined;
  setProdutoNaLista: React.Dispatch<React.SetStateAction<ILista>>;
  setUltimoProduto: React.Dispatch<
    React.SetStateAction<IItemLista | undefined>
  >;

  cliente: IInfoClient | undefined;
  setCliente: React.Dispatch<React.SetStateAction<IInfoClient | undefined>>;

  indicacao?: dataOneIndication | undefined;
  setIndicacao: React.Dispatch<React.SetStateAction<dataOneIndication | undefined>>;

  vendedor: IColab | undefined;
  setVendedor: React.Dispatch<React.SetStateAction<IColab | undefined>>;

  tipoPagamento: Payment | undefined;
  setTipoPagamento: React.Dispatch<React.SetStateAction<Payment | undefined>>;

  valorDaLista: number;
  setValorDaLista: React.Dispatch<React.SetStateAction<number>>;

  valorComDesconto: number;
  setValorComDesconto: React.Dispatch<React.SetStateAction<number>>;

  valorRecebido?: number;
  setValorRecebido: React.Dispatch<React.SetStateAction<number>>;
}

export const CaixaContext = createContext<CaixaContextProps | null>(null);
CaixaContext.displayName = 'Caixa';

export const useCaixaContext = () => {
  const {
    produtosNaLista,
    setProdutoNaLista,
    setUltimoProduto,
    ultimoProduto,
    cliente,
    setCliente,
    indicacao,
    setIndicacao,
    vendedor,
    setVendedor,
    tipoPagamento,
    setTipoPagamento,
    valorDaLista,
    setValorDaLista,
    valorComDesconto,
    setValorComDesconto,
    valorRecebido,
    setValorRecebido,
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
      setProdutoNaLista({produtos: updatedItems});
      updatedItems.length === 0
        ? setUltimoProduto(undefined)
        : setUltimoProduto(
          produtosNaLista.produtos.at(produtosNaLista.produtos.length - 2)
        );
    },
    [produtosNaLista, setProdutoNaLista, setUltimoProduto]
  );

  const limparLista = useCallback(() => {
    setProdutoNaLista({produtos: []});
    setUltimoProduto(undefined);
    setValorDaLista(0);
  }, [setProdutoNaLista, setUltimoProduto, setValorDaLista]);

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
      clientId: cliente ? cliente.id ? cliente.id : '' : '',
      valuePayment: valorDaLista,
      sellerId: vendedor ? vendedor.id ? vendedor.id : '' : '',
      typePaymentId: tipoPagamento ? tipoPagamento.id ? tipoPagamento.id : '' : '',
      indicationId: indicacao ? indicacao.id ? indicacao.id : '' : '',
    };
    console.log(compra);
    if (produtosNaLista.produtos.length === 0) {
      return Notification('Adicione ao menos um item.', 'error');
    }
    //CaixaService.submitCompra(compra);
  }, [
    getBoxSaleId,
    cliente,
    valorDaLista,
    vendedor,
    tipoPagamento,
    indicacao,
    produtosNaLista,
  ]);

  return {
    produtosNaLista,
    setProdutoNaLista,
    setUltimoProduto,
    ultimoProduto,
    cliente,
    setCliente,
    indicacao,
    setIndicacao,
    vendedor,
    setVendedor,
    tipoPagamento,
    setTipoPagamento,
    valorDaLista,
    setValorDaLista,
    valorComDesconto,
    setValorComDesconto,
    valorRecebido,
    setValorRecebido,
    finalizarCompra,
    adicionarNaLista,
    removerItemLista,
    limparLista,
  };
};

export const CaixaContextProvider: React.FC = ({children}) => {
  const [produtosNaLista, setProdutoNaLista] = useState<ILista>({
    produtos: [],
  });
  const [cliente, setCliente] = useState<IInfoClient>();
  const [indicacao, setIndicacao] = useState<dataOneIndication>();
  const [vendedor, setVendedor] = useState<IColab>();
  const [tipoPagamento, setTipoPagamento] = useState<Payment>();
  const [ultimoProduto, setUltimoProduto] = useState<IItemLista>();
  const [valorDaLista, setValorDaLista] = useState<number>(0);
  const [valorComDesconto, setValorComDesconto] = useState<number>(0);
  const [valorRecebido, setValorRecebido] = useState<number>(0);

  return (
    <CaixaContext.Provider
      value={{
        produtosNaLista,
        setProdutoNaLista,
        ultimoProduto,
        setUltimoProduto,
        valorDaLista,
        cliente,
        setCliente,
        indicacao,
        setIndicacao,
        vendedor,
        setVendedor,
        tipoPagamento,
        setTipoPagamento,
        setValorDaLista,
        valorComDesconto,
        setValorComDesconto,
        valorRecebido,
        setValorRecebido,
      }}
    >
      {children}
    </CaixaContext.Provider>
  );
};
