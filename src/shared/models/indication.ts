import * as yup from "yup"

export interface dataOneIndication {
    description: string,
    id: string,
    type: string,
}

export interface dataAllIndications {
    data: dataOneIndication[]
};

export interface registerIndication {
    type: string,
    description: string
}

export interface IIndicationSearch {
    numberOfPages: number
    actualPage: number
    totalElements: number
    hasNext: boolean
    data: dataOneIndication[]
}

export const indicationRegisterSchema = yup.object({
    type: yup.string().required(),
    description: yup.string().required(),
})