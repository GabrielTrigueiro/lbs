import React from 'react';
import ReactDOM from 'react-dom';
// import {App} from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ClientListPage, Login } from './pages';
import Home from './pages/home/Home';
import { AuthProvider, SideBarProvider, useSideBarContext } from './shared/contexts';


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
      }
    ]
  },
])

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <SideBarProvider>
        <RouterProvider router={router}/>
      </SideBarProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
