import { api } from "../axios-config"

interface IClient {
    id: string,
    name: string,
    sex?: string,
    rg?: string,
    cpf: string,
    indicacao?: [],
    email: string,
    telephone: Number,
    cell: Number,
    address?: string,
    cityId?: Number,
    city?: string,
    uf?: string,
    cep: Number,
    neighborhood?: string,
    number?: Number,
    money?: Number,
    dataNascimento?: Date,
    lastSale: null,
    createdAt?: null,
    updatedAt?: null
}

interface IDetalheClient {
    name: string,
    cpf: string,
    email: string,
    cell: Number,
}

type TClientComTotalCount = {
    data: IDetalheClient[]
}


const getAll = async(): Promise<TClientComTotalCount | Error> => {
    try {
        const { data } = await api.get('/api/client')
        //sem paginate e sem filtro de busca
        if (data){
            return{
                data,
                //sem total count
            }
        }
        return new Error('Erro ao Listar os registros :(')
    } catch (error) {
        console.error(error)
        return new Error((error as  { message: string }).message || 'Erro ao listar novos registros')
    }
}
const getById = async(): Promise<any> => {

}
const create = async(): Promise<any> => {

}
const updateById = async(): Promise<any> => {

}
const deleById = async(): Promise<any> => {

}

export const ClientService = {
    getAll,
    getById,
    create,
    updateById,
    deleById,
}