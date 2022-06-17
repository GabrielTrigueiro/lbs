import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "../services/api/auth/AuthService";

interface IAuthContext {
  isAuthenticated: boolean;
  logout: () => void;
  login: (username: string, password: string) => Promise<string | void>;
}
const AuthContext = createContext({} as IAuthContext);

const KEY_LOCAL_STORAGE_ACESS_TOKEN = "TOKEN";

export const AuthProvider: React.FC = ({ children }) => {
  const [acessToken, setAcessToken] = useState<string>();

  useEffect(() => {
    const acessToken = localStorage.getItem(KEY_LOCAL_STORAGE_ACESS_TOKEN);
    if (acessToken) {
      setAcessToken(JSON.parse(acessToken));
    } else {
      setAcessToken(undefined);
    }
  });

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
      value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
