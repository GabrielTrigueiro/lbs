import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "../services/api/auth/AuthService";
import jwt from "jwt-decode"

interface IAuthContext {
  isAuthenticated: boolean;
  dados?: IUser
  logout: () => void;
  login: (username: string, password: string) => Promise<string | void>;
}

interface IUser {
  name: string
  role: string[]
  image?: string
  sub: string //id do usuário
}
const AuthContext = createContext({} as IAuthContext);
const KEY_LOCAL_STORAGE_ACESS_TOKEN = "TOKEN";

export const AuthProvider: React.FC = ({ children }) => {
  const [acessToken, setAcessToken] = useState<string>();
  const [dados, setDados] = useState<IUser>();
  
  useEffect(() => {
    const acessToken = localStorage.getItem(KEY_LOCAL_STORAGE_ACESS_TOKEN);
    if (acessToken) {
      setDados(jwt(acessToken))
      setAcessToken(JSON.parse(acessToken));
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
          KEY_LOCAL_STORAGE_ACESS_TOKEN,
          JSON.stringify(result.acessToken)
        );
        setAcessToken(result.acessToken);
      }
    },
    []
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem(KEY_LOCAL_STORAGE_ACESS_TOKEN);
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
