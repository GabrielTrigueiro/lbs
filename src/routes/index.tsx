import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ClientListPage, Login } from "../pages";
import { ProviderListPage } from "../pages/providers-page";
import { useDrawerContext } from "../shared/contexts";

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
        label: "Colaboradores",
        icon: "account_box_icon",
        path: "/pagina-inicial/fornecedores",
      },
    ]);
  }, []);

  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/pagina-inicial/clientes" element={<ClientListPage />} />
      <Route path="/pagina-inicial/fornecedores" element={<ProviderListPage/>} />
    </Routes>
  );
};