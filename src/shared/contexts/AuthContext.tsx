import { AuthService } from "../services/api/auth/AuthService";
import jwt from "jwt-decode"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  
  useEffect(() => {
    const acessToken = localStorage.getItem(Acess_Token);
    if (acessToken) {
      setDados(jwt(acessToken))
      setAcessToken(`Bearer ${acessToken}`);
    } else {
      setAcessToken(undefined);
    }
  }, [acessToken]);

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      const result = await AuthService.auth(username, password);
      if (result instanceof Error) {
        return result.message;
      } else {
        localStorage.setItem(
          'Acess_Token',
          JSON.stringify(result.acessToken)
        );
        setAcessToken(result.acessToken);
      }
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
