import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClientContextProvider } from './context/ClientContext';
import { EmployeeContextProvider } from './context/EmployeeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EmployeeContextProvider>
   <ClientContextProvider>
      <App />
    </ClientContextProvider>
    </EmployeeContextProvider>
  </React.StrictMode>
)