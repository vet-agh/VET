import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {AuthContextProvider} from './context/AuthContext'

// Importing context providers
import { ClientContextProvider } from './context/ClientContext';
import { ClinicContextProvider } from './context/ClinicContext';
import { EquipmentContextProvider } from './context/EquipmentContext';
import { PatientContextProvider } from './context/PatientContext';
import {ScheduleContextProvider} from './context/ScheduleContext';
import { EmployeeContextProvider } from './context/EmployeeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <EmployeeContextProvider>
      <ClientContextProvider>
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
      </ClientContextProvider>
    </EmployeeContextProvider>

  </React.StrictMode>
)
