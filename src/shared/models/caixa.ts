import { IDataProduct } from "./product";

export interface IItem {
  code: string;
  quantidade: number;
}

export interface IItemLista {
  produto?: IDataProduct;
  quantidade: number;
  precoTotal: number;
}