import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ClientListPage, Login } from './pages';
import Home from './pages/home/Home';
import { AuthProvider, SideBarProvider, useSideBarContext } from './shared/contexts';
import { ProviderListPage } from './pages/providers';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import store from './shared/store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { IndicationPage } from './pages/indications';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>,
  },
  {
    path: "/home",
    element: <Home/>,
    children: [
      {
        path: "/home/clientes",
        element: <ClientListPage/>
      },
      {
        path: "/home/provedores",
        element: <ProviderListPage/>
      },
      {
        path: "/home/indicacoes",
        element: <IndicationPage/>
      },
    ]
  },
])

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <AuthProvider>
          <ToastContainer/>
          <SideBarProvider>
            <RouterProvider router={router}/>
          </SideBarProvider>
        </AuthProvider>
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
