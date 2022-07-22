import { BrowserRouter } from "react-router-dom";
import { Login } from "./pages";
import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { NotificationsProvider } from "./shared/contexts/notificationsContext/NotificationsContext";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        {/* <NotificationsProvider> */}
          <Login>
            <DrawerProvider>
              <BrowserRouter>
                <MenuLateral>
                  <AppRoutes />
                </MenuLateral>
              </BrowserRouter>
            </DrawerProvider>
          </Login>
        {/* </NotificationsProvider> */}
      </AppThemeProvider>
    </AuthProvider>
  );
};
