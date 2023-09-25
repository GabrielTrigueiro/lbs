import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notification } from 'shared/components';
import jwtDecode from 'jwt-decode';
import { IDadosDaCompra, IItemLista, ILista } from 'shared/models/caixa';
import { CaixaService } from 'shared/services/api/caixa/Caixa_Service';
import { IInfoClient } from '../models/client';
import { dataOneIndication } from '../models/indication';
import { IColab } from '../models/colab';
import { Payment } from '../models/payment';

interface CaixaContextProps {
  produtosNaLista: ILista;
  ultimoProduto: IItemLista | undefined;
  setProdutoNaLista: React.Dispatch<React.SetStateAction<ILista>>;
  setUltimoProduto: React.Dispatch<
    React.SetStateAction<IItemLista | undefined>
  >;

  isPorcentage: boolean;
  setIsPorcentage: React.Dispatch<React.SetStateAction<boolean>>;

  cliente: IInfoClient | undefined;
  setCliente: React.Dispatch<React.SetStateAction<IInfoClient | undefined>>;

  indicacao?: dataOneIndication | undefined;
  setIndicacao: React.Dispatch<
    React.SetStateAction<dataOneIndication | undefined>
  >;

  vendedor: IColab | undefined;
  setVendedor: React.Dispatch<React.SetStateAction<IColab | undefined>>;

  tipoPagamento: Payment | undefined;
  setTipoPagamento: React.Dispatch<React.SetStateAction<Payment | undefined>>;

  valorDaLista: number;
  setValorDaLista: React.Dispatch<React.SetStateAction<number>>;

  valorComDesconto: number;
  setValorComDesconto: React.Dispatch<React.SetStateAction<number>>;

  valorRecebido: string;
  setValorRecebido: React.Dispatch<React.SetStateAction<string>>;

  valorRetornado?: number;
  setValorRetornado: React.Dispatch<React.SetStateAction<number>>;
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
    isPorcentage,
    setIsPorcentage,
    valorRetornado,
    setValorRetornado,
  } = useContext(CaixaContext)!;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function imprimirCupom() {
    var dataAtual = new Date();
    var dataFormatada = dataAtual.toISOString().slice(0, 19).replace('T', ' ');

    var conteudoCupom = `
    ********** Cupom Fiscal **********
    Data: ${dataFormatada}
    ==================================
    Descrição           | Quantidade | Preço Unitário | Total
    ----------------------------------
  `;

    produtosNaLista.produtos.forEach((item: IItemLista) => {
      conteudoCupom += `
${item.produto?.name.padStart(22)} | ${item.quantidade
        .toString()
        .padEnd(11)} | ${item.produto?.custePrice
        .toFixed(2)
        .padEnd(15)} | ${item.precoTotal.toFixed(2)}
`;
    });

    conteudoCupom += `
    ==================================
    Soma total: ${valorDaLista.toFixed(2)}
    Desconto: ${(valorDaLista - valorComDesconto).toFixed(2)}
    Total com desconto: ${valorComDesconto.toFixed(2)}
  `;

    var janelaImprimir = window.open('', '', 'width=600,height=600');

    if (janelaImprimir) {
      janelaImprimir.document.open();
      janelaImprimir.document.write(
        '<html lang="pt-br"><head><title>Cupom Fiscal</title></head><body>'
      );
      janelaImprimir.document.write('<pre>' + conteudoCupom + '</pre>');
      janelaImprimir.document.write('</body></html>');
      janelaImprimir.document.close();
      janelaImprimir.print();
      janelaImprimir.close();
    } else {
      alert('Por favor, habilite a janela pop-up para imprimir o cupom.');
    }
  }

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
    setValorDaLista(0);
    setValorComDesconto(0);
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

    const numeroComPonto = valorRecebido.replace(/,/g, '.');

    let compra: IDadosDaCompra = {
      boxSaleId: getBoxSaleId(),
      products: lista,
      clientId: cliente ? (cliente.id ? cliente.id : '') : '',
      sellerId: vendedor ? (vendedor.id ? vendedor.id : '') : '',
      typePaymentId: tipoPagamento
        ? tipoPagamento.id
          ? tipoPagamento.id
          : ''
        : '',
      indicationId: indicacao ? (indicacao.id ? indicacao.id : '') : '',
      amount: valorComDesconto,
      amountPaid: Number(numeroComPonto),
      discount: valorDaLista - valorComDesconto,
      isDiscountPercentage: isPorcentage,
    };
    imprimirCupom();
    console.log(compra);
    if (produtosNaLista.produtos.length === 0) {
      return Notification('Adicione ao menos um item.', 'error');
    }
    CaixaService.submitCompra(compra).then((resposta) => {
      setValorRetornado(resposta.data.amountReturn);
    });
  }, [
    produtosNaLista.produtos,
    cliente,
    vendedor,
    tipoPagamento,
    indicacao,
    valorComDesconto,
    valorRecebido,
    valorDaLista,
    isPorcentage,
    setValorRetornado,
    imprimirCupom,
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
    isPorcentage,
    setIsPorcentage,
    valorRetornado,
    setValorRetornado,
  };
};

export const CaixaContextProvider: React.FC = ({ children }) => {
  const [produtosNaLista, setProdutoNaLista] = useState<ILista>({
    produtos: [],
  });
  const [cliente, setCliente] = useState<IInfoClient>();
  const [isPorcentage, setIsPorcentage] = useState<boolean>(false);
  const [indicacao, setIndicacao] = useState<dataOneIndication>();
  const [vendedor, setVendedor] = useState<IColab>();
  const [tipoPagamento, setTipoPagamento] = useState<Payment>();
  const [ultimoProduto, setUltimoProduto] = useState<IItemLista>();
  const [valorDaLista, setValorDaLista] = useState<number>(0);
  const [valorComDesconto, setValorComDesconto] = useState<number>(0);
  const [valorRecebido, setValorRecebido] = useState<string>('');
  const [valorRetornado, setValorRetornado] = useState<number>(0);

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
        isPorcentage,
        setIsPorcentage,
        setValorRetornado,
        valorRetornado,
      }}
    >
      {children}
    </CaixaContext.Provider>
  );
};
