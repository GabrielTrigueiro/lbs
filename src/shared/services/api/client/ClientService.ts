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
    id: string,
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
const getById = async(id: number): Promise<IDetalheClient | Error> => {
    try {
        const { data } = await api.get(`/api/client/${id}`)
        if (data){
            return data
        }
        return new Error('Erro ao consultar o registro T-T')
    } catch (error) {
        console.error(error)
        return new Error((error as  { message: string }).message || 'Erro ao consultar o registro T-T')
    }
}
const create = async(dados: Omit<IDetalheClient, 'id'>): Promise<string | Error> => {
    try {
        const { data } = await api.post<IDetalheClient>('/api/client', dados)
        if (data){ 
            return data.id
        }
        return new Error('Erro ao criar o registro u-u')
    } catch (error) {
        console.error(error)
        return new Error((error as  { message: string }).message || 'Erro ao criar o registro u-u')
    }
}
const updateById = async(id: string, dados: IDetalheClient): Promise<void | Error> => {
    try {
      await api.put<IDetalheClient>(`/api/client${id}`, dados)
    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || 'Erro ao atualizar os dados do registro')
    }
}
const deleById = async(id: string): Promise<void | Error> => {
    try {
        await api.delete<IDetalheClient>(`/api/client${id}`)
      } catch (error) {
          console.error(error)
          return new Error((error as {message: string}).message || 'Erro ao deletar o registro')
      }
}

export const ClientService = {
    getAll,
    getById,
    create,
    updateById,
    deleById,
}