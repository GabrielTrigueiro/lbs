import { environment } from "../../../environment"
import { api } from "../axios-config"

export type TClientTotal = {
    username: string,
    password: string,
}
interface ITokenProps {
    type: string
    acessToken: string
}
export interface IAuth{
    acessToken: ITokenProps
}

export const auth = async (username: string, password: string): Promise<IAuth | Error>   => {
    try {
        const {data} = await api.post(environment.url_login, {username, password})
        if(data){
            return data
        }
        return new Error('Erro ao criar o registro')
    } catch (error) {
        return new Error((error as {message: string}).message || 'Erro ao criar o registro')
    }
}

export const AuthService = {
    auth,
}