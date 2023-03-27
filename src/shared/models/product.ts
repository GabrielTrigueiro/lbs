import { ICategoryRegister } from "./categories";
import { IProviderCadastroInfo } from "./provider";
import * as yup from "yup";

export interface IDataProduct {
    id?: string;
    name: string;
    description: string;
    quantidade: number;
    custePrice: number;
    salerPrice: number;
    tagPrice: number;
    codeBarras: string;
    codeInt: string;
    category: ICategoryRegister;
    provider: IProviderCadastroInfo;
}
export interface IDataProductRegiser {
    categoryId: string,
    codeBarras: string,
    custePrice: 0,
    description: string,
    informations: [
      {
        color: string,
        quantity: 0,
        size: string
      }
    ],
    name: string,
    providerId: string,
    quantity: number,
    salerPrice: number,
    tagPrice: number
}

interface oneInformation{
    color: string;
    quantity: number;
    size: string;
}

export interface IProductSearch {
    numberOfPages: number;
    actualPage: number;
    totalElements: number;
    hasNext: boolean;
    data: IDataProduct[];
}

export interface IProductPackage {
    data: IDataProduct[];
    message: string;
    errors: string;
    success: boolean;
}

export type TProductList = {
    data: IProductPackage;
}

const oneInfoSchema = yup.object().shape({
    color: yup.string(),
    quantity: yup.string(),
    size: yup.string(),
})

export const ProductValidationSchema = yup.object({
    id: yup.string(),
    categoryId: yup.string(),
    codeBarras: yup.string(),
    custePrice: yup.number(),
    description: yup.string(),
    informations: yup.array().of(oneInfoSchema),
    name: yup.string(),
    providerId: yup.string(),
    quantity: yup.number(),
    salerPrice: yup.number(),
    tagPrice: yup.number(),
})