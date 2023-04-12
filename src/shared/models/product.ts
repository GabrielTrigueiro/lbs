import { ICategoryRegister } from "./categories";
import {IProviderCadastroInfo} from "./provider";
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
    informations?: oneInformation[],
    category: ICategoryRegister;
    provider: IProviderCadastroInfo;
}

export interface IDataProductRegiser {
    id?:string;
    codeInt?: string,
    categoryId: string,
    codeBarras: string,
    custePrice: number,
    description: string,
    informations?: oneInformation[],
    name: string,
    providerId: string,
    quantity: number,
    salerPrice: number,
    tagPrice: number
}

export interface oneInformation{
    id?: number;
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
    data: IDataProductRegiser[];
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
    categoryId: yup.string(),
    codeBarras: yup.string(),
    custePrice: yup.number(),
    description: yup.string(),
    informations: yup.array(),
    name: yup.string(),
    providerId: yup.string(),
    quantity: yup.number(),
    salerPrice: yup.number(),
    tagPrice: yup.number(),
})