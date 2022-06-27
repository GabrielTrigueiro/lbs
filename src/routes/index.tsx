import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ClientListPage } from "../pages";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOption } = useDrawerContext();

  useEffect(() => {
    setDrawerOption([
      {
        label: "Clientes",
        icon: "home",
        path: "/pagina-inicial/clientes",
      },
      {
        label: "Colaboradores",
        icon: "assignment_ind_rounded",
        path: "/pagina-inicial/colaboradores",
      },
    ]);
  }, []);

  
  return (
    <Routes>
      <Route path="/pagina-inicial/clientes" element={<ClientListPage />} />
      <Route path="/pagina-inicial/colaboradores" element={<div>oi</div>} />
      <Route path="*" element={<Navigate to="/pagina-inicial/clientes" />} />
    </Routes>
  );
};
