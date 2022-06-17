import { BrowserRouter } from "react-router-dom";
import { Login } from "./pages";
import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { AuthProvider } from "./shared/contexts/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
