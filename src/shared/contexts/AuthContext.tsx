import { createContext, useState, useContext, useCallback, useEffect, useMemo } from "react";
import { AuthService } from "../services/api/auth/AuthService";
import { Notification } from "../components";
import { ILogin } from "../models/user";
import { useNavigate } from "react-router";

interface IAuthContext {
  isAuthenticated: boolean
  logout: () => void
  login: (e: ILogin) => Promise<void>
}

const AuthContext = createContext({} as IAuthContext);
export const Jwt = "Acess_Token";
export const AuthProvider: React.FC = ({ children }) => {

  const [token, setToken] = useState<string>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let acessToken = localStorage.getItem(Jwt);
    if (acessToken) {
      setToken(acessToken);
    } else {
      setToken(undefined);
    }
  }, [token]);

  const login = useCallback(async (user: ILogin) => {
    await AuthService.login(user)
      .then(result => {
        Notification(result.message, "success")
        localStorage.setItem(Jwt, JSON.stringify(result.acessToken))
        setToken(result.acessToken)
        setIsAuthenticated(result.isAuthenticated)
        navigate("/clientes")
        console.log(result)
      });
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem(Jwt);
    setToken(undefined);
    navigate(0)
  }, [navigate]);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login: login,
      logout: logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);