import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EmployeeContextProvider } from './context/EmployeeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <EmployeeContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </EmployeeContextProvider>
);