import * as yup from "yup"

export interface ICategory {
    id?: string
    code: string
    description: string
    name: string
}

export interface ICategorySearch {
    numberOfPages: number
    actualPage: number
    totalElements: number
    hasNext: boolean
    data: ICategory[]
}

export const categoryRegisterSchema = yup.object({
    name: yup.string().required(),
    code: yup.string().required(),
    description: yup.string().required(),
})