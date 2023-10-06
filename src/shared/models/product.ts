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

export interface IDataProductRegiser {
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
  data: IDataProductRegiser[];
  message: string;
  errors: string;
  success: boolean;
}

export type TProductList = {
  data: IProductPackage;
};

export const ProductValidationSchema = yup.object().shape({
  // categoryId: yup.string().required('Campo obrigatório'),
  informations: yup.array().notRequired(),
  codeBarras: yup.string().required('Campo obrigatório'),
  custePrice: yup.number().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  // providerId: yup.string().required('Campo obrigatório'),
  quantity: yup.number().required('Campo obrigatório'),
  salerPrice: yup.number().required('Campo obrigatório'),
  tagPrice: yup.number().required('Campo obrigatório'),
});
