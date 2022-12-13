import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Importing context providers
//Clients
//Clinics
import {ClinicContextProvider} from './context/ClinicContext'
//Equipment
//Patients
import {ScheduleContextProvider} from './context/ScheduleContext';
//Employees

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClinicContextProvider>
    <ScheduleContextProvider>
      <App />
    </ScheduleContextProvider>
    </ClinicContextProvider>
  </React.StrictMode>
);