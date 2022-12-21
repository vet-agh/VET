import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages and components
import Navbar from './components/Navbar'
import Home from './views/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
// Routes import
import PatientPage from './views/PatientsMainPage'
import SchedulePage from './views/ScheduleMainPage'
import EquipmentMainPage from './views/EquipmentMainPage'
import ClinicPage from './views/ClinicMainPage'
import ClientPage from './views/ClientMainPage'
import EmployeePage from './views/EmployeeMainPage'
import {useAuthContext} from './hooks/useAuthContext'


function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/clients" element={<ClientPage/>}/>
            <Route path="/clinics" element={<ClinicPage/>}/>
            <Route path="/equipment" element={<EquipmentMainPage/>}/>
            <Route path="/patients" element={<PatientPage/>}/>
            <Route path="/schedule" element={<SchedulePage/>}/>
            <Route path="/employees" element={<EmployeePage/>}/>
            <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route path='/signup' element={!user ? <Signup/> : <Navigate to="/login"/>}/>
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;