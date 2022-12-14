import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PatientContextProvider } from './context/PatientContext';

// Importing context providers
//Clients
//Clinics
//Equipment
//Patients
import {ScheduleContextProvider} from './context/ScheduleContext';
//Employees

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PatientContextProvider>
      <ScheduleContextProvider>
        <App />
      </ScheduleContextProvider>
    </PatientContextProvider>
  </React.StrictMode>
);