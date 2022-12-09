import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClientContextProvider } from './context/ClientContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClientContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ClientContextProvider>
);