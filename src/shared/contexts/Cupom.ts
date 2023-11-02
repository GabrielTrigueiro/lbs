import { IDadosDaCompra, IItemLista } from 'shared/models/caixa';

function imprimirCupom(compra: IDadosDaCompra) {
  var dataAtual = new Date();
  var dataFormatada = dataAtual.toISOString().slice(0, 19).replace('T', ' ');
  var conteudoCupom = `
  ********** Cupom Fiscal **********
  Data: ${dataFormatada}
  =========================================================
  Descrição           | Quantidade | Preço Unitário | Total
  ---------------------------------------------------------
`;
  compra?.products.forEach((item: IItemLista) => {
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
    Soma total: ${compra?.amount.toFixed(2)}
    Desconto: ${compra?.discount.toFixed(2)}
`;
  //    Total com desconto: ${(tempCupom?.amount - tempCupom?.discount).toFixed(2)}
  var janelaImprimir = window.open('', '', 'width=1000,height=700');
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

export default imprimirCupom;
