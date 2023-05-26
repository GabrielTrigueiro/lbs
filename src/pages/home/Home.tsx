import { Route, Router, Routes, useNavigate } from "react-router";
import { MenuLateral } from "../../shared/components";
import { useSideBarContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import styles from "../../styles/Home/Home.module.scss";
import { ThemeProvider } from "@mui/material";
import DefaultTheme from "../../shared/themes/DefaultTheme";
import { ClientListPage } from "../clients";
import { ProviderListPage } from "../providers";
import { IndicationPage } from "../indications";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./PrivateRoutes";
import { Login } from "../login";
import { CaixaPage } from "../caixa";
import { ProductPage } from "../products/ProductPage";
import { Categories } from "../categories";
import { AuthProvider, useAuthContext } from "../../shared/contexts/AuthContext";
import PrivateRoutes from "./PrivateRoutes";

export default function Home() {

  const { setSideBarOption } = useSideBarContext();

  useEffect(() => {
    setSideBarOption([
      {
        label: "Clientes",
        icon: "account_circle",
        path: "/clientes",
      },
      {
        label: "Fornecedores",
        icon: "badge",
        path: "/fornecedores",
      },
      {
        label: "Indicações",
        icon: "diversity_3",
        path: "/indicacoes",
      },
      {
        label: "categorias",
        icon: "local_offer",
        path: "/categorias",
      },
      {
        label: "produtos",
        icon: "shopping_bag",
        path: "/produtos",
      }, {
        label: "caixa",
        icon: "paid_icon",
        path: "/caixa",
      },
    ]);
  }, [setSideBarOption]);

  return (
    <ThemeProvider theme={DefaultTheme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<MenuLateral />}>
                <Route path="/clientes" element={<ClientListPage />} />
                <Route path="/fornecedores" element={<ProviderListPage />} />
                <Route path="/indicacoes" element={<IndicationPage />} />
                <Route path="/categorias" element={<Categories />} />
                <Route path="/produtos" element={<ProductPage />} />
                <Route path="/caixa" element={<CaixaPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider >
  )
}