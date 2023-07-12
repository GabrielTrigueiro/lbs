import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Home from './pages/home/Home';
import { SideBarProvider } from './shared/contexts';
import store from './shared/store';

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <ToastContainer />
        <SideBarProvider>
          <Home />
        </SideBarProvider>
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
