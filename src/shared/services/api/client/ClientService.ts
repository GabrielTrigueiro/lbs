import { api } from "../axios-config"

interface IListagemBaseInfoClient {
    id: string,
    name: string,
    cpf: string,
    email: string,
    cell: number,
}

type TClientTotal = {
    data: IListagemBaseInfoClient[]
}

const getAll = async (): Promise<TClientTotal | Error>   => {
    try {
        const {data} = await api.get('http://localhost:8081/api/client')
        if(data){
            data
        }
        return new Error('Erro ao listar os registros')
    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || 'Erro ao listar os registros')
    }
}
const getByIDd = async (id: string): Promise<IListagemBaseInfoClient | Error>   => {
    try {
        const {data} = await api.get(`http://localhost:8081/api/client${id}`)
        if(data){
            data
        }
        return new Error('Erro ao procurar o registro')
    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || 'Erro ao procurar o registro')
    }
}
const UpdateById = async (id: string, dados: IListagemBaseInfoClient): Promise<void | Error>   => {
    try {
        await api.put(`http://localhost:8081/api/client${id}`, dados) 
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
const Create = async (dados: Omit<IListagemBaseInfoClient, 'id'>): Promise<Number | Error>   => {
    try {
        const {data} = await api.post<IListagemBaseInfoClient>(`http://localhost:8081/api/client`, dados)
        if(data){
            data.id
        }
        return new Error('Erro ao criar o registro')
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
