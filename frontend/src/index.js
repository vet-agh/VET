import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {AuthContextProvider} from './context/AuthContext'

// Importing context providers
//Clients
import { ClinicContextProvider } from './context/ClinicContext';
import { EquipmentContextProvider } from './context/EquipmentContext';
import { PatientContextProvider } from './context/PatientContext';
import {ScheduleContextProvider} from './context/ScheduleContext';
//Employees

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClinicContextProvider>
      <PatientContextProvider>
        <ScheduleContextProvider>
          <EquipmentContextProvider>
            <AuthContextProvider> 
              <App />
            </AuthContextProvider>
          </EquipmentContextProvider>
        </ScheduleContextProvider>
      </PatientContextProvider>
    </ClinicContextProvider>
  </React.StrictMode>
)