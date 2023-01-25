import { AxiosError } from "axios";
// import { Notification } from "../../../components";
import { environment } from "../../../environment";
import { api } from "../axios";

//type usuario
export type TUser = {
    usename:string
    password:string
}

//interface para auth
export interface IAuth{
    token:string
    type:string
    message:string
    isAuthenticated:string
}

//guarda os dados retornados da api de auth
export const auth = 
async (username: string, password: string):Promise<any | AxiosError> => {
    return await api.post(environment.url_login, {username, password})
        .then(data => {
            if(data instanceof AxiosError){
                return data;
            }
            console.log('chegou na promise')
            return data.data;
        })
        .catch(err => {
            // Notification(err.response.data.message, "error");
        });
};

export const AuthService = {
    auth,
};