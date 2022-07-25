import { AxiosError } from "axios"
import { environment } from "../../../environment"
import { api } from "../axios-config"

export type TClientTotal = {
    username: string,
    password: string,
}

export interface IAuth{
    acessToken: string
    type: string
    message: string
    isAuthenticated: boolean
}

export const auth = async (username: string, password: string): Promise<any | AxiosError>   => {

    return await api.post(environment.url_login, {username, password})
    .then(data => {
        if(data instanceof AxiosError){
            return data
        }
        return data.data
    })
    .catch(err => {
        console.error(err)
    })
}

export const AuthService = {
    auth,
}