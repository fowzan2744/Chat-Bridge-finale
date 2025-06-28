// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/styles/index.css';

import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
