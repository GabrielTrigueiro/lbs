import { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "../services/api/auth/AuthService";
import { Notification } from "../components";

//dados user
interface IUser{
    name: string
    sub: string //id
}

//dados Auth
interface IAuthContext{
    isAuthenticated: boolean
    dados?: IUser
    logout: ()=> void
    login: (username:string, password:string) =>
    Promise<string|void>
}

//contexto auth
const AuthContext = createContext({} as IAuthContext);

//token do local storage
export const AcessToken = "Acess_Token";

export const AuthProvider: React.FC = ({children}) =>{
    const [acessToken, setAcessToken] = useState<string>();
    const [dados, setDados] = useState<IUser>();

    //atualiza toda vez que o token é mudado e o salva
    useEffect(() => {
        const acessToken = localStorage.getItem(AcessToken);
    
        if (acessToken) {
            setDados(jwtDecode(acessToken));
            setAcessToken(acessToken);
        } else {
            setAcessToken(undefined);
        }
    }, [acessToken]);

    //login e validação
    const handleLogin = useCallback(
        async (username: string, password: string) => {
            await AuthService.auth(username, password)
                .then( result => {
                    if (result instanceof AxiosError) {
                        Notification(result.message, "error");
                    }
                    else{
                        Notification(result.message, "success");
                        localStorage.setItem(
                            "Acess_Token", JSON.stringify(result.acessToken)
                        );
                        setAcessToken(result.acessToken);
                    }
                });
        },[]
    );

    //logout
    const handleLogout = useCallback(() => {
        localStorage.removeItem(AcessToken);
        setAcessToken(undefined);
    }, []
    );

    //status auth ou não
    const isAuthenticated = useMemo(() => 
        acessToken !== undefined, [acessToken]
    );

    return (
        <AuthContext.Provider
            value={{
                dados,
                isAuthenticated,
                login: handleLogin,
                logout: handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
    
};
export const useAuthContext = () => useContext(AuthContext);