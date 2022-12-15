import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages and components
import Navbar from './components/Navbar'
import Home from './views/Home'
import Login from './pages/Login'
// Routes import
import PatientPage from './views/PatientsMainPage'
import SchedulePage from './views/ScheduleMainPage'
import EquipmentMainPage from './views/EquipmentMainPage'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>}/>
            {/* Clients */}
            {/* Clinics */}
            <Route path="/equipment" element={<EquipmentMainPage/>}/>
            <Route path="/patients" element={<PatientPage/>}/>
            <Route path="/schedule" element={<SchedulePage/>}/>
            {/* Employees */}
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;