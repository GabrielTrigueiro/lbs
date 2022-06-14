import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Login } from "../pages";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOption } = useDrawerContext();

  useEffect(()=>{
    setDrawerOption([
      {
        label:'Pagina Inicial',
        icon:'home',
        path: '/pagina-inicial'
      },
      {
        label:'Pagina Inicial',
        icon:'assignment_ind_rounded',
        path: '/login'
      }
    ]);
  },[]);

  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/pagina-inicial" element={<Dashboard/>}/>
      
      <Route path="*" element={<Navigate to="/pagina-inicial"/>} />
    </Routes>
  );
};
