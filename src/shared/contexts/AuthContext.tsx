import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { AuthService } from '../services/api/auth/AuthService';
import { ILogin } from '../models/user';
import { useNavigate, useParams } from 'react-router';
import jwtDecode from 'jwt-decode';

interface IAuthContext {
  isAuthenticated: boolean;
  logout: () => void;
  login: (e: ILogin) => Promise<void>;
  userName: string;
}

const AuthContext = createContext({} as IAuthContext);

export const Jwt = 'Acess_Token';

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>();
  const [userName, setUsername] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    let acessToken = localStorage.getItem(Jwt);
    if (acessToken) {
      setToken(acessToken);
      let user: any = jwtDecode(localStorage.getItem('Acess_Token') || '');
      setUsername(user.name);
    } else {
      setToken(undefined);
    }
  }, [token, navigate, params]);

  const login = useCallback(async (user: ILogin) => {
    await AuthService.login(user).then((result) => {
      localStorage.setItem(Jwt, JSON.stringify(result.data.acessToken));
      let user: any = jwtDecode(localStorage.getItem('Acess_Token') || '');
      setUsername(user.name);
      setToken(result.data.acessToken);
      setIsAuthenticated(result.data.isAuthenticated);
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(Jwt);
    setToken(undefined);
    navigate(0);
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userName,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
