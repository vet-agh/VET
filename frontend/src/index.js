import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Importing context providers


import { EquipmentContextProvider } from './context/EquipmentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EquipmentContextProvider>
      <App/>
    </EquipmentContextProvider>
  </React.StrictMode>
);