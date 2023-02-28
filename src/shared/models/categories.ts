export interface ICategoryRegister {
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
    data: ICategoryRegister[]
}