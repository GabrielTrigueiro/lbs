import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ClientListPage, Login } from "../pages";
import { ProviderListPage } from "../pages/providers-page";
import { MenuLateral } from "../shared/components";
import { useAuthContext, useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {

  const { setDrawerOption } = useDrawerContext();

  useEffect(() => {
    setDrawerOption([
      {
        label: "Clientes",
        icon: "person_outline_icon",
        path: "/pagina-inicial/clientes",
      },
      {
        label: "Fornecedores",
        icon: "account_box_icon",
        path: "/pagina-inicial/fornecedores",
      },
    ]);
  }, []);

    return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/pagina-inicial" element={<MenuLateral/>}>
        <Route path="clientes" element={<ClientListPage />}/>
        <Route path="fornecedores" element={<ProviderListPage/>}/>
      </Route>
    </Routes>
  );
};