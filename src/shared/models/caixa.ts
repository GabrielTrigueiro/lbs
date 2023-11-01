import { IDataProduct } from './product';

export interface IItem {
  code: string;
  quantidade: number;
}

export interface IItemLista {
  id: string;
  produto?: IDataProduct;
  quantidade: string;
  precoTotal: number;
}

export interface ILista {
  produtos: IItemLista[];
}

export interface IDadosProdutoCompra {
  quantity: number;
  productId: string;
}

export interface IDadosDaCompra {
  boxSaleId: string;
  clientId: string;
  indicationId?: string | undefined;
  products?: any;
  sellerId: string;
  typePaymentId: string;
  discount: number;
  amount: number;
  amountPaid?: number;
  isDiscountPercentage: boolean;
}
