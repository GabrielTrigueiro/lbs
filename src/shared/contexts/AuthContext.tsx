import { AuthService } from "../services/api/auth/AuthService";
import jwt from "jwt-decode"
import { AxiosError } from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Snack, SnackbarContext } from "./NotificationContext";

interface IUser {
  name: string
  role: string[]
  image?: string
  sub: string //id do usuário
}
interface IAuthContext {
  isAuthenticated: boolean;
  dados?: IUser
  logout: () => void;
  login: (username: string, password: string) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContext);

export const Acess_Token = "Acess_Token";

export const AuthProvider: React.FC = ({ children }) => {

  const [acessToken, setAcessToken] = useState<string>();
  const [dados, setDados] = useState<IUser>();
  const {snack, setSnack} = useContext(SnackbarContext);
  
  useEffect(() => {
    const acessToken = localStorage.getItem(Acess_Token);
    if (acessToken) {
      setDados(jwt(acessToken))
      setAcessToken(`Bearer ${acessToken}`)
    } else {
      setAcessToken(undefined)
    }
  }, [acessToken])

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      await AuthService.auth(username, password)
      .then( result => {
        if (result instanceof AxiosError) {
          //tratar erro aqui
          console.log(result)
          console.log(result.response?.data.message)
          setSnack(new Snack({message: result.response?.data.message, color:'error', open: true}))
      }else{
          setSnack(new Snack({message: 'Login realizado com sucesso', color:'success', open: true}))
          localStorage.setItem(
            'Acess_Token',
            JSON.stringify(result.acessToken)
          );
          setAcessToken(result.acessToken);
        }
      })     
    },
    []
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem(Acess_Token);
    setAcessToken(undefined);
  }, []);
  
  const isAuthenticated = useMemo(() => acessToken !== undefined, [acessToken]);
  return (
    <AuthContext.Provider
      value={{ dados ,isAuthenticated, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext)
