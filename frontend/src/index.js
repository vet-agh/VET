import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClientContextProvider } from './context/ClientContext';

// Importing context providers
//Clients
//Clinics
import { EquipmentContextProvider } from './context/EquipmentContext';
import { PatientContextProvider } from './context/PatientContext';
import {ScheduleContextProvider} from './context/ScheduleContext';
//Employees

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClientContextProvider>
  <React.StrictMode>
    <PatientContextProvider>
      <ScheduleContextProvider>
        <EquipmentContextProvider>
          <App />
        </EquipmentContextProvider>
      </ScheduleContextProvider>
    </PatientContextProvider>
  </React.StrictMode>
  </ClientContextProvider>
);