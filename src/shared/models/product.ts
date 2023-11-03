import { ICategory } from './categories';
import { IProviderCadastroInfo } from './provider';
import * as yup from 'yup';

export type statusProduto = 'EM_ESTOQUE' | 'ULT_UNIDADES' | 'FALTANDO';

export interface IDataProduct {
  id: string;
  name: string;
  description: string;
  quantity: number;
  custePrice: number;
  salerPrice: number;
  tagPrice: number;
  codeBarras: string;
  codeInt: string;
  informations?: IProductInformation[];
  category: ICategory;
  provider: IProviderCadastroInfo;
  status: statusProduto;
}

export interface IDataProductRegister {
  id?: string;
  codeBarras: string;
  name: string;
  description: string;
  quantity: number;
  informations?: IProductInformation[];
  categoryId: string;
  providerId: string;
  custePrice: number;
  salerPrice: number;
  tagPrice: number;
}

export type IListaInformacoesProduto = IProductInformation[];

export interface IProductInformation {
  id?: string;
  isNew: boolean;
  color: string;
  quantity: number;
  size: number;
}

export interface IProductSearch {
  numberOfPages: number;
  actualPage: number;
  totalElements: number;
  hasNext: boolean;
  data: IDataProduct[];
}

export interface IProductPackage {
  data: IDataProductRegister[];
  message: string;
  errors: string;
  success: boolean;
}

export type TProductList = {
  data: IProductPackage;
};

export const ProductValidationSchema = yup.object().shape({
  categoryId: yup.string().required('Categoria é obrigatório'),
  informations: yup.array().notRequired(),
  codeBarras: yup.string().required('Código de barras é obrigatório'),
  description: yup.string().required('Descrição é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
  providerId: yup.string().required('Fornecedor é obrigatório'),
  quantity: yup.number().required('Quantidade é obrigatório'),
  custePrice: yup.number().required('Custo é obrigatório'),
  salerPrice: yup.number().required('Preço de venda é obrigatório'),
  tagPrice: yup.number().required('Preço de etiqueta é obrigatório'),
});
