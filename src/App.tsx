import { BrowserRouter } from "react-router-dom";
import { Login } from "./pages";
import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { TesteSnackBar } from "./shared/contexts/NotificationContext";

export const App = () => {
  return (
    <TesteSnackBar>
      <AuthProvider>
        <AppThemeProvider>
        
            
              <DrawerProvider>
                <BrowserRouter>
                  
                    <AppRoutes />
                  
                </BrowserRouter>
              </DrawerProvider>
            
          
        </AppThemeProvider>
      </AuthProvider>
    </TesteSnackBar>
  );
};
