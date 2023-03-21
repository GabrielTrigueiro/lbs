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

export const ProductValidationSchema = yup.object({
    id: yup.string(),
    name: yup.string(),
    description: yup.string(),
    quantidade: yup.number(),
    custePrice: yup.number(),
    salerPrice: yup.number(),
    tagPrice: yup.number(),
    codeBarras: yup.string(),
    codeInt: yup.string(),
})