import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/bootstrap.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import { TokenProvider } from './Context/TokenContext';
import { UserProvider } from './Context/UserContext';
import { LanguageProvider } from './Context/LanguageContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <TokenProvider>
          <UserProvider>
            <LanguageProvider>
              <App />
            </LanguageProvider>
          </UserProvider>
        </TokenProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
