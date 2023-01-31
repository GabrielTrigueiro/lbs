import React from 'react';
import ReactDOM from 'react-dom';
// import {App} from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ClientListPage, Login } from './pages';
import Home from './pages/home/Home';
import { AuthProvider, SideBarProvider, useSideBarContext } from './shared/contexts';
import { ProviderListPage } from './pages/providers';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import store from './shared/store';

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
    ]
  },
])

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ToastContainer/>
        <SideBarProvider>
          <RouterProvider router={router}/>
        </SideBarProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
