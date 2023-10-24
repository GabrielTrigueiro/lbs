import { ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { MenuLateral } from '../../shared/components';
import { useSideBarContext } from '../../shared/contexts';
import { AuthProvider } from '../../shared/contexts/AuthContext';
import DefaultTheme from '../../shared/themes/DefaultTheme';
import { CaixaPage } from '../caixa';
import { Categories } from '../categories';
import { ClientListPage } from '../clients';
import { IndicationPage } from '../indications';
import { Login } from '../login';
import { ProductPage } from '../products/ProductPage';
import { ProviderListPage } from '../providers';
import PrivateRoutes from './PrivateRoutes';
import { CaixaContextProvider } from 'shared/contexts/CaixaContext';
import ColaboratorsPage from 'pages/colaborators/ColaboratorsPage';
import HandshakeIcon from '@mui/icons-material/Handshake';

export default function Home() {
  const { setSideBarOption } = useSideBarContext();

  useEffect(() => {
    setSideBarOption([
      {
        label: 'Clientes',
        icon: 'account_circle',
        path: '/clientes',
      },
      {
        label: 'Fornecedores',
        icon: 'badge',
        path: '/fornecedores',
      },
      {
        label: 'Indicações',
        icon: 'diversity_3',
        path: '/indicacoes',
      },
      {
        label: 'categorias',
        icon: 'local_offer',
        path: '/categorias',
      },
      {
        label: 'produtos',
        icon: 'shopping_bag',
        path: '/produtos',
      },
      {
        label: 'colaboradores',
        icon: 'handshake',
        path: '/colaboradores',
      },
      {
        label: 'caixa',
        icon: 'paid_icon',
        path: '/caixa',
      },
    ]);
  }, [setSideBarOption]);

  return (
    <ThemeProvider theme={DefaultTheme}>
      <CaixaContextProvider>
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
                  <Route path="/colaboradores" element={<ColaboratorsPage />} />
                  <Route path="/caixa" element={<CaixaPage />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </CaixaContextProvider>
    </ThemeProvider>
  );
}
