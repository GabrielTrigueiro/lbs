import { api } from "../axios-config"

export interface IListagemBaseInfoClient {
    id?: string,
    address: string
    cell: string
    cep: string
    city: string
    cpf: string
    email: string
    name: string
    neighborhood: string
    number: string
    rg: string
    sex: string
    telephone: string
    uf: string
}

export interface IInfo {
    data: IListagemBaseInfoClient[],
    message: string,
    errors: string,
    success: boolean
}

export type TClientTotal = {
    data: IInfo
}

const getAll = async (): Promise<TClientTotal | Error>   => {
    try {
        const {data} = await api.get('/api/client')
        console.log(data)
        if(data){
            return{
                data
            }
        }
        return new Error('Erro ao listar os registros')
    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || 'Erro ao listar os registros')
    }
}
const getByIDd = async (id: string): Promise<IListagemBaseInfoClient | Error>   => {
    try {
        const {data} = await api.get(`https://localhost:8081/api/client${id}`)
        if(data){
            return data
        }
        return new Error('Erro ao procurar o registro')
    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || 'Erro ao procurar o registro')
    }
}
const UpdateById = async (id: string, dados: IListagemBaseInfoClient): Promise<void | Error>   => {
    try {
        await api.put(`https://localhost:8081/api/client${id}`, dados) 
        return new Error('Erro ao atualiazar o registro')
    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || 'Erro ao atualizar o registro')
    }
}
const DeleteById = async (id: string): Promise<void | Error>   => {
    try {
        await api.delete(`http://localhost:8081/api/client${id}`) 
        return new Error('Erro ao deletar o registro')
    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || 'Erro ao deletar o registro')
    }
}
const Create = async (dados: IListagemBaseInfoClient): Promise<IInfo | Error |string >   => {
    try {
        const data = await api.post<IInfo>(`http://localhost:8081/api/client`, dados)
        
        return data.data

    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || 'Erro ao criar o registro')
    }
}

export const ClienteService = {
    getAll,
    getByIDd,
    UpdateById,
    DeleteById,
    Create,
}
